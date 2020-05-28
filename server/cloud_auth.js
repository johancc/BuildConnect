const path = require("path"); // provide utilities for working with file and directory paths
const cloud = require("@google-cloud/storage")

// connect to google cloud account
const serviceKey = path.join(__dirname, "..", "/google-cloud-credentials-heroku.json");
console.log(serviceKey);
const { Storage } = cloud;
const storage = new Storage({
    keyFilename: serviceKey,
    projectId: "green-shore-278522"
})

const DEFAULT_BUCKET_NAME = "ignite_photos_bucket"

module.exports = {
    storage,
    DEFAULT_BUCKET_NAME
};
