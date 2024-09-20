// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getAuth ,GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import {getStorage} from "firebase/storage";

//
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCx2WDGOL-1d63g7r3uBcHe9rPNoKlBzgM",
  authDomain: "redishop-73fc0.firebaseapp.com",
  projectId: "redishop-73fc0",
  storageBucket: "redishop-73fc0.appspot.com",
  messagingSenderId: "863819060362",
  appId: "1:863819060362:web:ee9e19adab64387457c973",
  measurementId: "G-L2EXV4M20Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const GoogleProvider = new GoogleAuthProvider()
