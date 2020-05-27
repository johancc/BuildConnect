
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectName: String,
    tweetDescription: String,
    description: String,
    imageUrl: String,
    teamSize: Number,
    dateStarted: Date,
    helpNeeded: String,
    teamDescription: String,
    link: String,
    contactInfo: String,
    skillsNeeded: String
});

// compile model from schema
module.exports = mongoose.model("project", projectSchema);