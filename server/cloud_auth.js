// Read API key
const path = require("path"); 
require("dotenv").config();

const serviceKey = path.join(__dirname, "..", "/google-cloud-credentials-heroku.json");
// Google Cloud Auth & Storage 
const cloud = require("@google-cloud/storage")
const { Storage } = cloud;
const storage = new Storage({
    keyFilename: serviceKey,
    projectId: "green-shore-278522"
})

const DEFAULT_BUCKET_NAME = "ignite_photos_bucket"

module.exports = {
    storage,
    DEFAULT_BUCKET_NAME
};
