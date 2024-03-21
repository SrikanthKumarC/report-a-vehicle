// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRfhhL0ZUtepY233883Y8r8fyJQ-4AJLc",
  authDomain: "reportdriving-af418.firebaseapp.com",
  projectId: "reportdriving-af418",
  storageBucket: "reportdriving-af418.appspot.com",
  messagingSenderId: "347035250890",
  appId: "1:347035250890:web:c7f294144b84dd1bb4c433",
  measurementId: "G-R34W2X649B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// const analytics = getAnalytics(app);    