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

// import models so we can interact with the database
const User = require("./models/user.js");
const Project  = require("./models/project.js");

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
    User.find({firebase_uid: req.user.user_id})
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
    newUser.save()
        .then((user) => res.send(user))
        .catch((err) => res.sendStatus(500).json(err));
});


router.post("/addProject", firebaseMiddleware, (req, res) => {
    // Update should be reflected by the user and project documents.
    let newProject = Project(req.body.project);
    newProject.save()
    .then((proj) => {
        User.findById(req.body.user._id).then((user) => {
            user.projects.append(proj._id);
            user.save().then((user) => res.send(user));
        })
    })
    .catch((err) => {
        res.sendStatus(500).json(err);
    })
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
    console.log(`API route not found: ${req.method} ${req.url}`);
    res.status(404).send({
        msg: "API route not found"
    });
});

module.exports = router;