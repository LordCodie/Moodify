import { initializeApp } from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBEqV-XFIOqKo17SQ_BfSFeBZNIERZVogU",
    authDomain: "moodify-app-za.firebaseapp.com",
    projectId: "moodify-app-za",
    storageBucket: "moodify-app-za.firebasestorage.app",
    messagingSenderId: "1087099817512",
    appId: "1:1087099817512:web:c2b87dfd461e7525db2f1d"
};

const app = initializeApp(firebaseConfig);

connectAuthEmulator(getAuth(app), 'http://localhost:2000')

connectFirestoreEmulator(getFirestore(app), 'localhost', 2001)

global.firebaseApp = app