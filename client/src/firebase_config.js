import firebase from "firebase/app";
require("firebase/auth");

const config = {
    // add config here
};

firebase.initializeApp(config);

export default firebase;
export const auth = firebase.auth();