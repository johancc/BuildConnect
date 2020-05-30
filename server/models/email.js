
const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
    address: String,
});

// compile model from schema
module.exports = mongoose.model("email", emailSchema);