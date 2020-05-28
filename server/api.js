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

// Email utilities.
const email = require("./email.js");


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
    User.findOne({firebase_uid: req.user.user_id}).then((projOwner) => {
        newProject.projectOwner = projOwner._id;

        // Only update the user's projects once the project is saved.
        newProject.save()
            .then((proj) => {
                projOwner.projects = projOwner.projects || [];
                projOwner.projects.push(proj._id);
                projOwner.save().then(()=> res.send(proj));  
            })
    }).catch((err) => {
        res.sendStatus(500).json(err);
    });
});

/**
 * Updates a user's information.
 * Params:
 *  update - an object with all the fields to be updated (see user schema for possible fields)
 *  photoData - a string with binary data of a photo
 * Returns:
 *  returns the user's information
 */
router.post("/updateUser", firebaseMiddleware, (req, res) => {
    // TODO: extract update from req.body.update and convert photoData from req.body to a photoURL to store in update
    // then apply the update to the User database
});


/**
 * Parameters:
 *      message - a string with the personal message to be sent to the project owner.
 *      user - an object detailing the user that is making the request
 *      projectID - a string, the UID for the project.
 */
router.post("/requestToJoin", firebaseMiddleware, (req, res) => {
    
    /**
     * Order of operations:
     *  Find the project that the user is requesting to join
     *  Find who the owner is based on the projectOwnerID
     *  Email the owner and the user a join and confirmation email respectively.
     */

    const { message, projectID } = req.body;
    // Find the project owner.
    Project.findOne({_id:projectID})
        .then((proj) =>  User.findOne({_id: proj.projectOwner}))
        .then((owner) => {
            const ownerEmail = owner.email;
            // Find the user's email.
            return User.findOne({firebase_uid: req.user.user_id})
                .then( async (user) => {
                    email.sendJoinRequestEmails(user, message, ownerEmail, () => res.send({}))
                })
                
        })
        .catch((err) => {
            res.sendStatus(500).json(err);
        })
})

// anything else falls to this "not found" case
router.all("*", (req, res) => {
    console.log(`API route not found: ${req.method} ${req.url}`);
    res.status(404).send({
        msg: "API route not found"
    });
});

module.exports = router;