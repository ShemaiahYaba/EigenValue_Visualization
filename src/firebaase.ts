// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQDz79tWXbZKiPP8QluFUsPmIv-t1Piv8",
  authDomain: "mlab-47ed0.firebaseapp.com",
  projectId: "mlab-47ed0",
  storageBucket: "mlab-47ed0.firebasestorage.app",
  messagingSenderId: "1076766054553",
  appId: "1:1076766054553:web:1b30017a3ac023a2a3c008",
  measurementId: "G-C0XYW03N0P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
