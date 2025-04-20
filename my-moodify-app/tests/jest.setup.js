const { initializeApp } = require("firebase/app")
const {
    getAuth,
    createUserWithEmailAndPassword,
    connectAuthEmulator,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} = require("firebase/auth")
const { getFirestore, connectFirestoreEmulator } = require("firebase/firestore")

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

const signUp = async (auth, email, password) => {
    const createAccount = await createUserWithEmailAndPassword(auth, email, password)
    const { uid } = await createAccount.user
    console.log("uid:", uid)
    return uid
}

const signIn = async (auth, email, password) => {
    const signInAccount = await signInWithEmailAndPassword(auth, email, password)
    const { uid } = await signInAccount.user
    console.log("uid:", uid)
    return uid
}

const passwordReset = async (auth, email) => {
    try {
        await sendPasswordResetEmail(auth, email)
        console.log({ success: true, message: "Password reset email sent!" })
        return { success: true, message: "Password reset email sent!" }
    } catch (error) {
        const errorMessage = error.message
        console.log(errorMessage)
        return { success: false, message: errorMessage }
    }
}

global.firebaseApp = app
module.exports = { signUp, signIn, passwordReset }