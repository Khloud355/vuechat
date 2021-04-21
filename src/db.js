import firebase from "firebase/app";
import "firebase/database";

var firebaseConfig = {
    apiKey: "AIzaSyCBCn0ZvOTCkzrtac9mn4EcMiGbtyU5Z5c",
    authDomain: "udmy-ng-http-685d9.firebaseapp.com",
    projectId: "udmy-ng-http-685d9",
    storageBucket: "udmy-ng-http-685d9.appspot.com",
    messagingSenderId: "759893631497",
    appId: "1:759893631497:web:7c29df69faec703cb44ed8",
    measurementId: "G-L4VYPQFJNP",
    databaseURL:"https://udmy-ng-http-685d9.firebaseio.com/"
  };
  const db = firebase.initializeApp(firebaseConfig );
  export default db;