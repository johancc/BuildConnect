
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: String,
    tweetDescription: String,
    image: String,
    people: [String],
    dateStarted: Date,
    helpNeeded: String,
    teamDescription: String,
    link: String,
    contactInfo: [String],
    skillsNeeded: [String],
});

// compile model from schema
module.exports = mongoose.model("project", projectSchema);