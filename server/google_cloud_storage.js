// This file contains utility functions for uploading photos to google cloud storage

// Auth for google cloud storage
const { storage } = require("./cloud_auth.js")

// Provide utilities for working with file and directory paths
const path = require("path");

// uuid for generating unique file names (so that files are not overwritten)
const {v4: uuidv4 } = require('uuid');

// Extract extension from base64
const mimeTypes = require('mimetypes');

// Returns the public url of an uploaded file
const getPublicURL = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;

// Returns the file name given a public url
const getFileNameFromURL = (URL) => {
    try {
        return URL.match(`https://storage.googleapis.com/.*/(.*)`)[1];
    } catch {
        return "";
    }
}

const getDefaultOptions = (mimeType) => {
    return {
        metadata: { contentType: mimeType },
        public: true,
        validation: 'md5'
    }
}

const uploadFileToGCS =  (photoData, bucketName, options ) => {
    const image = photoData,
        mimeType = image.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1],
        fileExtension = mimeTypes.detectExtension(mimeType),
        base64EncodedImageString = image.replace(/^data:image\/\w+;base64,/, ''),
        imageBuffer = Buffer.from(base64EncodedImageString, "base64");

    options = options || getDefaultOptions(mimeType);
    const fileName = `${uuidv4()}.${fileExtension}`;
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    return file
        .save(imageBuffer, options)
        .then((err) => {
            if (err.length !== 0) return;
            return getPublicURL(bucketName, fileName);
        });
}

// Params:
//  localFilePath: local path of the file
//  bucketName: name of bucket to upload to
//  options: options for uploading
// Returns:
//  returns the public url of the uploaded file
const uploadLocalFileToGCS  = (localFilePath, bucketName, options) => {
    options = options || {};
    const bucket = storage.bucket(bucketName);
    const fileName = path.basename(localFilePath);
    const file = bucket.file(fileName);

    return bucket.upload(localFilePath, options)
        .then(() => file.makePublic())
        .then(() => getPublicURL(bucketName, fileName));
};

// Deletes a file from GCS given a fileName and bucketName, returns a Promise
const deleteFileFromGCS = (fileName, bucketName) => {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);
    return file.delete();
};


module.exports = {
    uploadFileToGCS,
    uploadLocalFileToGCS,
    deleteFileFromGCS,
    getFileNameFromURL,
    getPublicURL,
}