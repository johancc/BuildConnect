
const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
    firebase_uid: String,
    name: String,
    email: String,
    company: String,
    photoURL: String,
    accountType: String,
    mentorTypes: [String],
    reasonToMentor: String,
    shortBio: String,
    field: String,
    role: String,
    projects: [mongoose.Types.ObjectId],
    public: Boolean,
});

// compile model from schema
module.exports = mongoose.model("mentor", mentorSchema);