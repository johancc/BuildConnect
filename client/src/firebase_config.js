import firebase from "firebase/app";
require("firebase/auth");

const config = {
    apiKey: "AIzaSyClbyxY9DkgqjowNMNG5m1wcZQMR_9ZD1I",
    authDomain: "buildconnect-46760.firebaseapp.com",
    databaseURL: "https://buildconnect-46760.firebaseio.com",
    projectId: "buildconnect-46760",
    storageBucket: "buildconnect-46760.appspot.com",
    messagingSenderId: "974507610380",
    appId: "1:974507610380:web:42df0a9031b4b799edf929",
    measurementId: "G-05TTMKZL0W"
};

firebase.initializeApp(config);

export default firebase;
export const auth = firebase.auth();