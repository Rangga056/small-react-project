// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // You can just follow the step from firebase website
  apiKey: "INSERT YOUR API KEY HERE",
  authDomain: "INSERT THE AUTH DOMAIN",
  projectId: "INSERT THE PROJECT ID",
  storageBucket: "INSERT THE STORAGE BUCKET",
  messagingSenderId: "INSERT THE ID",
  appId: "INSERT THE ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);