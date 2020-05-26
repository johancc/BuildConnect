
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firebase_uid: String,
    name: String,
    email: String,
    major: String,
    projects: [mongoose.Types.ObjectId],
    public: Boolean,
});

// compile model from schema
module.exports = mongoose.model("user", userSchema);