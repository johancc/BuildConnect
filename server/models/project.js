
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectName: String,
    shortDescription: String,
    longDescription: String,
    photoURL: String,
    teamSize: Number,
    dateStarted: Date,
    helpNeeded: String,
    teamDescription: String,
    link: String,
    contactInfo: String,
    skillsNeeded: String,
    projectOwner: mongoose.Types.ObjectId,
});

// compile model from schema
module.exports = mongoose.model("project", projectSchema);