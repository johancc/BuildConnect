// Server configuration below
require("dotenv").config();

// connect to mongodb
const mongoose = require("mongoose");
const mongoConnectionURL = process.env.MONGO_URI;
const databaseName = "ignite";
mongoose
    .connect(mongoConnectionURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: databaseName,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

const Mentor = require("../server/models/mentor.js");

let newMentor = Mentor({
    /**
     * Fill in the mentor fields here.
     * Fields are defined in the server/models/mentor.js.
     */
});

newMentor.save().then(() => console.log("Added mentor."));
