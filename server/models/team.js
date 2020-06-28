
const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
   teamName: String,
   members: Array,
   updates: Array,
   project: mongoose.Types.ObjectId,
});

// compile model from schema
module.exports = mongoose.model("team", teamSchema);