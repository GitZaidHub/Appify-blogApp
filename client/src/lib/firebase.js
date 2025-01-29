// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "webapp-blog-390b2.firebaseapp.com",
  projectId: "webapp-blog-390b2",
  storageBucket: "webapp-blog-390b2.appspot.com",
  messagingSenderId: "224469030184",
  appId: "1:224469030184:web:553e89c119aca973072c1d"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage();