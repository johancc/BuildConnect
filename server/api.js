/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/
// For routing
const express = require("express");
const router = express.Router();

// For auth
const firebaseMiddleware = require("./auth.js");

// For uploading photos to google cloud storage
const { DEFAULT_BUCKET_NAME } = require("./cloud_auth");
const { uploadFileToGCS, deleteFileFromGCS } = require("./google_cloud_storage.js");

// import models so we can interact with the database
const User = require("./models/user.js");
const Project  = require("./models/project.js");

const path = require("path"); // provide utilities for working with file and directory paths

// api endpoints: all these paths will be prefixed with "/api/"

// GET
router.get("/listProjects", firebaseMiddleware, (req, res) => {
    const limit = req.query.limit || 10;
    const categories = req.query.categories || [];

    Project.find({categories: {
        "$all": categories,
    }}).limit(limit).then((projs) => {
        res.send(projs)
    })
    .catch((err) => {
        res.sendStatus(500).json(err);
    })
});

router.get("/user", firebaseMiddleware, (req,res) => {
    User.findOne({firebase_uid: req.user.user_id})
        .then((user) => {
            res.send(user);
        })
        .catch((err) => {
            res.sendStatus(500).json(err);
        });
});

router.get("/project", firebaseMiddleware, (req, res) => {
    Project.findById(req.query._id)
        .then((proj) => {
            res.send(proj)
        })
        .catch((err) => {
            res.sendStatus(500).json(err);
        });
});

/**
 * Adds a user to the database. 
 * Params:
 *  user - an object with all the fields defined by the user schema.
 * Returns:
 *  returns the document stored in documents
 */
router.post("/addUser", firebaseMiddleware, (req,res) => {
    
    let newUser = User(req.body.user);
    newUser.firebase_uid = req.user.user_id;
    newUser.save()
        .then((user) => res.send(user))
        .catch((err) => res.sendStatus(500).json(err));
});

router.post("/removeUser", firebaseMiddleware, (req, res) => {
    User.findOneAndDelete({firebase_uid: req.user.user_id})
        .then(res.send({}))
        .catch((err) => res.sendStatus(500).json(err));
})

router.post("/addProject", firebaseMiddleware, (req, res) => {
    // Update should be reflected by the user and project documents.
    // TODO: We are using req.body.project.imageData as the base64 image data.
    // This should be uploaded to GCP and the resulting url stored in req.body.project.imageURL;

    let newProject = Project(req.body.project);
    newProject.save()
    .then((proj) => {
        User.findOne({firebase_uid: req.user.user_id}).then((user) => {
            user.projects = user.projects || [];
            user.projects.push(proj._id);
            user.save().then(() => res.send(proj));
        });
    })
    .catch((err) => {
        res.sendStatus(500).json(err);
    })
});

/**
 * Updates a user's information.
 * Params:
 *  update - an object with all the fields to be updated (see user schema for possible fields)
 *  imageData - a string object with image data
 * Returns:
 *  returns the user's information
 */
router.post("/updateUser", firebaseMiddleware, (req, res) => {
    // TODO:
    //  0) verify user has access, otherwise return error
    //  1) extract update from req.body.update
    //  2) if req.body contains imageData => upload imageData to google cloud:
    //      a) if successful:
    //          i) if user has old photoURL: remove old photo from google cloud
    //          ii) add {photoURL: new URL} to `update`
    //      b) else: do nothing (or return error)?
    //  3) update the user's entry in mongo db with `update`

    res.send({OK: 'ok'});
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
    console.log(`API route not found: ${req.method} ${req.url}`);
    res.status(404).send({
        msg: "API route not found"
    });
});

module.exports = router;