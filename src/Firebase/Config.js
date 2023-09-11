// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7KYZp5ydIDuDiXYk0km1Sxs9wCVPijY8",
  authDomain: "oasis-66e0b.firebaseapp.com",
  projectId: "oasis-66e0b",
  storageBucket: "oasis-66e0b.appspot.com",
  messagingSenderId: "426833924031",
  appId: "1:426833924031:web:bc64fe138f631fb47adb0a",
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB   = getFirestore(FirebaseApp);