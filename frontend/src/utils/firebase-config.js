import {getAuth} from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-6L_pcYWLzALC9jkMPa_7qNkd2RVCOns",
  authDomain: "pg-management-system-150c1.firebaseapp.com",
  projectId: "pg-management-system-150c1",
  storageBucket: "pg-management-system-150c1.appspot.com",
  messagingSenderId: "182807077599",
  appId: "1:182807077599:web:9995b51ee8d4c4f419ff6a",
  measurementId: "G-X77GH67W5D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const firebaseAuth = getAuth(app);