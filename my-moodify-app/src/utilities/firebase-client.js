// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBEqV-XFIOqKo17SQ_BfSFeBZNIERZVogU",
    authDomain: "moodify-app-za.firebaseapp.com",
    projectId: "moodify-app-za",
    storageBucket: "moodify-app-za.firebasestorage.app",
    messagingSenderId: "1087099817512",
    appId: "1:1087099817512:web:c2b87dfd461e7525db2f1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth()
// connectAuthEmulator(auth, 'http://localhost:2000')

const fireStore = getFirestore()
// connectFirestoreEmulator(getFirestore, 'localhost', 2001)