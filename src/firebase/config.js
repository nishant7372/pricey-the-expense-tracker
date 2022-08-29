import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSwB4KN5fODEp938TmXG3JcJUFu0XkPqc",
  authDomain: "pricey---the-finance-tracker.firebaseapp.com",
  projectId: "pricey---the-finance-tracker",
  storageBucket: "pricey---the-finance-tracker.appspot.com",
  messagingSenderId: "440895794618",
  appId: "1:440895794618:web:2067aa2822ceb13d5dc183",
  measurementId: "G-GSCZM01DKG",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFireStore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.Timestamp;

export { projectFireStore, projectAuth, timestamp };
