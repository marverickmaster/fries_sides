import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your FRIES & SIDES configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLHLYtBnD1YBd0XqrFz3FUUpm7SUoiO5s",
  authDomain: "fries-sides.firebaseapp.com",
  projectId: "fries-sides",
  storageBucket: "fries-sides.firebasestorage.app",
  messagingSenderId: "823651562388",
  appId: "1:823651562388:web:7f50bb7dca737c259c1581"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the database and auth
export const db = getFirestore(app);
export const auth = getAuth(app);