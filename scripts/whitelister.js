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

const Email = require("../server/models/email.js");

let email = "" // Email here
if (email.length !== 0) {
    let newWhitelistEntry = Email({ address: email });
    newWhitelistEntry.save().then(console.log("Added " + email));
};

