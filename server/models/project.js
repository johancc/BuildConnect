
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectName: String,
    shortDescription: String,
    longDescription: String,
    photoURL: String,
    teamSize: Number,
    helpNeeded: String,
    teamDescription: String,
    projectLength: Number,
    link: String,
    contactInfo: String,
    skillsNeeded: String,
    public: Boolean,
    projectOwner: mongoose.Types.ObjectId,
});

// compile model from schema
module.exports = mongoose.model("project", projectSchema);