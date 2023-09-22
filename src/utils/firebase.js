// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "bloggingusingnextprisma.firebaseapp.com",
  projectId: "bloggingusingnextprisma",
  storageBucket: "bloggingusingnextprisma.appspot.com",
  messagingSenderId: "78350426020",
  appId: "1:78350426020:web:ede28187349071760c2b31"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);