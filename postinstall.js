const fs = require("fs");
require("dotenv").config();
fs.writeFile("./google-credentials-heroku.json", process.env.GOOGLE_CONFIG, (err) => {
    if (err) return console.log(err);
    console.log("Credentials written")
})