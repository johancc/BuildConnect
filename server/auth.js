const firebase = require("firebase-admin");

async function firebaseMiddleware(req, res, next) {
    try {
        req.user = await firebase.auth().verifyIdToken(req.query.token || req.headers.token || req.body.token);
        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(403);
    }
}

module.exports = firebaseMiddleware;

