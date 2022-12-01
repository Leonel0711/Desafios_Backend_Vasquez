// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBPxbSAEb0r1Wbd3M8yVRZuvuU_0depEe0",
    authDomain: "backendproyect.firebaseapp.com",
    projectId: "backendproyect",
    storageBucket: "backendproyect.appspot.com",
    messagingSenderId: "633560505696",
    appId: "1:633560505696:web:3c45f05ce0800d21521205"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);