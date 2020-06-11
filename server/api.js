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
const { DEFAULT_BUCKET_NAME, USER_PROFILE_BUCKET } = require("./cloud_auth");
const { uploadFileToGCS, getPublicURL, deleteFileFromGCS, getFileNameFromURL } = require("./google_cloud_storage.js");

// import models so we can interact with the database
const User = require("./models/user.js");
const Project  = require("./models/project.js");
const Email = require("./models/email.js");
const Mentor = require("./models/mentor.js");

// Email utilities.
const email = require("./email.js");

// api endpoints: all these paths will be prefixed with "/api/"

// GET
router.get("/listProjects", firebaseMiddleware, (req, res) => {
    const limit = req.query.limit || 10;
    const categories = req.query.categories || [];

    // Use filtering later on.
    // Project.find({categories: {
    //     "$all": categories,
    // }})
    Project.find({public: true}).limit(limit).then((projs) => {
        res.send(projs)
    })
    .catch((err) => {
        res.sendStatus(500).json(err);
    })
});

router.get("/listMentors", firebaseMiddleware, (req, res) => {
    const limit = req.query.limit || 20;
    Mentor.find({}).limit(limit).then((mentors) => {
        res.send(mentors);
    }).catch((err) => {
        res.sendStatus(500).json(err);
    })
});

router.get("/owner", firebaseMiddleware, (req, res) => {
    console.log("hit hit")
    console.log(req.query.ownerID);
    User.findOne({_id: req.query.ownerID}).then((owner) => {
        res.send(owner);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500).json(err);
    });
})
router.get("/mentor", firebaseMiddleware, (req,res) => {
    Mentor.findOne({firebase_uid: req.user.user_id})
        .then((mentor) => {
            res.send(mentor);
        })
        .catch((err) => {
            res.sendStatus(500).json(err);
        });
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


// Returns a list of emails from whitelist that match the given email address
router.get("/whitelist/:email", (req, res) => {
    const emailAddress = req.params.email;
    Email.find({address: emailAddress})
        .then((emails) => {
            res.send(emails);
        })
        .catch((err) => {
            res.sendStatus(500).json(err);
        });
})

/**
 * Adds a mentor to the database.
 * Params:
 *  mentor - an object with all the fields defined by the mentor schema.
 * Returns:
 *  returns the document stored in documents
 */
router.post("/addMentor", firebaseMiddleware, (req,res) => {
    let mentorData = req.body.mentor;
    mentorData.accountType = "mentor";
    mentorData.firebase_uid = req.user.user_id;
    if (mentorData.photoData) {
        // Upload profile pic to GCP
        return uploadFileToGCS(mentorData.photoData, USER_PROFILE_BUCKET)
            .then((photoURL) => {
                delete mentorData.photoData;
                if (!photoURL) return mentorData;
                mentorData.photoURL = photoURL;
                return mentorData;
            })
            .then((mentorData) => Mentor(mentorData).save())
            .then((mentor) => res.send(mentor))
            .catch((err) => res.sendStatus(500).json(err));
    } else {
        Mentor(mentorData).save()
            .then((mentor) => res.send(mentor))
            .catch((err) => res.sendStatus(500).json(err));
    }
});

/**
 * Adds a user to the database. 
 * Params:
 *  user - an object with all the fields defined by the user schema.
 * Returns:
 *  returns the document stored in documents
 */
router.post("/addUser", firebaseMiddleware, (req,res) => {
    let userData = req.body.user;
    userData.firebase_uid = req.user.user_id;
    userData.accountType = "student";
    if (userData.photoData) {
        // Upload profile pic to GCP
        return uploadFileToGCS(userData.photoData, USER_PROFILE_BUCKET)
            .then((photoURL) => {
                delete userData.photoData;
                if (!photoURL) return userData;
                userData.photoURL = photoURL;
                return userData;
            })
            .then((userData) => User(userData).save())
            .then((user) => res.send(user))
            .catch((err) => res.sendStatus(500).json(err));
    } else {
        User(userData).save()
            .then((user) => res.send(user))
            .catch((err) => res.sendStatus(500).json(err));
    }
});

router.post("/removeUser", firebaseMiddleware, (req, res) => {
    User.findOneAndDelete({firebase_uid: req.user.user_id})
        .then(res.send({}))
        .catch((err) => res.sendStatus(500).json(err));
});

router.post("/removeMentor", firebaseMiddleware, (req, res) => {
    Mentor.findOneAndDelete({firebase_uid: req.user.user_id})
        .then(res.send({}))
        .catch((err) => res.sendStatus(500).json(err));
});

router.post("/addProject", firebaseMiddleware, (req, res) => {
    // Update should be reflected by the user and project documents.
    // This should be uploaded to GCP and the resulting url stored in req.body.project.imageURL;
    let projectData = req.body.project;
    projectData.public = false;
    User.findOne({firebase_uid: req.user.user_id}).then((projOwner) => {
        projectData.projectOwner = projOwner._id;

        // Upload if photoData is provided.
        if (projectData.photoData) {
            return uploadFileToGCS(projectData.photoData, DEFAULT_BUCKET_NAME)
                .then((photoURL) => {
                    delete projectData.photoData;
                    if (!photoURL) return projectData;
                    projectData.photoURL = photoURL;
                    return projectData;
                })
                .then((projectData) => Project(projectData).save())
                .then((proj) => {
                    projOwner.projects = projOwner.projects || [];
                    projOwner.projects.push(proj._id);
                    projOwner.save().then(() => res.send(proj));  
                })
                .catch((err) => {
                    res.sendStatus(500).json(err)
                });
        } else {
            Project(projectData).save()
                .then((proj) => {
                    projOwner.projects = projOwner.projects || [];
                    projOwner.projects.push(proj._id);
                    return projOwner.save().then(() => res.send(proj));
                })
                .catch((err) => res.sendStatus(500).json(err));
        }
            
    });
});



/**
 * Updates a user's information.
 * Params:
 *  update - an object with all the fields to be updated (see user schema for possible fields)
 * Returns:
 *  returns the user's information
 */
router.post("/updateUser", firebaseMiddleware, (req, res) => {
    let updateData = req.body.user;
    if (updateData.photoData) {
        return uploadFileToGCS(updateData.photoData, DEFAULT_BUCKET_NAME)
            .then((photoURL) => {
                // We don't want to add the binary data to MongoDB.
                delete updateData.photoData;
                if (!photoURL) return updateData;
                updateData.photoURL = photoURL;
                return updateData;
            })
            .then(User.findOne({firebase_uid: req.user.user_id}).then((user) => deleteFileFromGCS(user.photoURL)))
            .then((updateData) => User.updateOne({firebase_uid: req.user.user_id}, updateData))
            .then(User.findOne({firebase_uid: req.user.user_id}).then((user) => res.send(user)))
            .catch((err) => {
                res.sendStatus(500).json(err);
            })
    } else {
        User.updateOne({firebase_uid: req.user.user_id}, updateData)
            .then(() => {
                User.findOne({firebase_uid: req.user.user_id}).then((user) => res.send(user));
            })
            .catch((err) => {
                res.sendStatus(500).json(err);
            })
    }
});

/**
 * Updates a mentor's information.
 * Params:
 *  update - an object with all the fields to be updated (see mentor schema for possible fields)
 * Returns:
 *  returns the mentor's information
 */
router.post("/updateMentor", firebaseMiddleware, (req, res) => {
    let updateData = req.body.mentor;
    if (updateData.photoData) {
        return uploadFileToGCS(updateData.photoData, DEFAULT_BUCKET_NAME)
            .then((photoURL) => {
                // We don't want to add the binary data to MongoDB.
                delete updateData.photoData;
                if (!photoURL) return updateData;
                updateData.photoURL = photoURL;
                return updateData;
            })
            .then(Mentor.findOne({firebase_uid: req.user.user_id}).then((mentor) => deleteFileFromGCS(mentor.photoURL)))
            .then((updateData) => Mentor.updateOne({firebase_uid: req.user.user_id}, updateData))
            .then(Mentor.findOne({firebase_uid: req.user.user_id}).then((mentor) => res.send(mentor)))
            .catch((err) => {
                res.sendStatus(500).json(err);
            })
    } else {
        Mentor.updateOne({firebase_uid: req.user.user_id}, updateData)
            .then(() => {
                Mentor.findOne({firebase_uid: req.user.user_id}).then((mentor) => res.send(mentor));
            })
            .catch((err) => {
                res.sendStatus(500).json(err);
            })
    }
});

/**
 * Updates a user's information.
 * Params:
 *  update - an object with all the fields to be updated (see user schema for possible fields)
 * Returns:
 *  returns the user's information
 */

 router.post("/updateProject", firebaseMiddleware, (req, res) => {
     let updateData = req.body.project;

     if (updateData.photoData) {
         return uploadFileToGCS(updateData.data, DEFAULT_BUCKET_NAME)
            .then((photoURL) => {
                delete updateData.data;
                if (!photoURL) return updateData;
                updateData.photoURL = photoURL;
                return updateData;
            })
            .then((updateData) => Project.updateOne({_id: updateData._id}, updateData))
            .then(Project.findOne({_id: updateData._id}))
            .then((proj) => res.send(proj))
            .catch((err) => {
                res.sendStatus(500).json(err);
            })
     } else {
         Project.updateOne({_id: updateData._id}, updateData)
                .then(() => Project.findOne({_id: updateData._id}))
                .then((proj) => res.send(proj))
                .catch((err) => {
                    res.sendStatus(500).json(err);
                });
     }
 })


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
    console.log(message);
    console.log(projectID);
    // Find the project owner.
    Project.findOne({_id:projectID})
        .then((proj) =>  User.findOne({_id: proj.projectOwner}))
        .then((owner) => {
            const ownerEmail = owner.email;
            console.log(owner)
            console.log("--")
            console.log(req.user.user_id)
            // Find the user's email.
            return User.findOne({firebase_uid: req.user.user_id})
                .then( async (user) => {
                    console.log("user");
                    console.log(user);
                    email.sendJoinRequestEmails(user, message, ownerEmail, () => res.send({}))
                })
                
        })
        .catch((err) => {
            res.sendStatus(500).json(err);
        })
})

// TODO: Add request mentor
router.post("/requestMentor", firebaseMiddleware, (req, res) => {
    const { message, mentorID} = req.body;
    Mentor.findOne({_id: mentorID})
        .then((mentor) => {
            return User.findOne({firebase_uid: req.user.user_id})
                    .then( async (user) => {
                        email.sendMentorshipRequest(user, message, mentor.name, mentor.email, () => res.send({}));
                    });
        });
})
// anything else falls to this "not found" case
router.all("*", (req, res) => {
    console.log(`API route not found: ${req.method} ${req.url}`);
    res.status(404).send({
        msg: "API route not found"
    });
});

module.exports = router;