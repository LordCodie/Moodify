const { initializeApp } = require("firebase/app")
const {
    getAuth,
    createUserWithEmailAndPassword,
    connectAuthEmulator,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    deleteUser,
    sendEmailVerification,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile
} = require("firebase/auth")
const {
    getFirestore,
    connectFirestoreEmulator,
    setDoc,
    doc,
    getDoc,
    getDocs,
    collection,
    deleteDoc
} = require("firebase/firestore")

const firebaseConfig = {
    apiKey: "AIzaSyBEqV-XFIOqKo17SQ_BfSFeBZNIERZVogU",
    authDomain: "moodify-app-za.firebaseapp.com",
    projectId: "moodify-app-za",
    storageBucket: "moodify-app-za.firebasestorage.app",
    messagingSenderId: "1087099817512",
    appId: "1:1087099817512:web:c2b87dfd461e7525db2f1d"
};

const app = initializeApp(firebaseConfig)

connectAuthEmulator(getAuth(app), 'http://localhost:2000')
connectFirestoreEmulator(getFirestore(app), 'localhost', 2001)

const baseUrl =
    process.env.NODE_ENV === 'production'
        ? 'https://your-app.vercel.app'
        : 'http://localhost:5173'

const actionCodeSettings = {
    url: `${baseUrl}/login`,
    handleCodeInApp: true,
}

const signUp = async (auth, email, password, username) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(auth.currentUser, { displayName: username })
        await sendEmailVerification(user, actionCodeSettings)
        await signOut(auth)
        return { succes: true, message: `User succesfully signed-up` }
    } catch (error) {
        console.log(error)
        return { succes: false, message: error }
    }
}

const signIn = async (auth, email, password) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)

        if (!user.emailVerified) {
            await signOut(auth)
            return {
                succes: false,
                message: "Please verify your email before signing in."
            }
        }
        
        return { succes: true, message: `User succesfully signed-in` }
    } catch (error) {
        console.log(error)
        return { succes: false, message: error }
    }
}

const googleSignIn = async (auth) => {
    const provider = new GoogleAuthProvider()

    try {
        await signInWithPopup(auth, provider)
        return { succes: true, message: `User signed-in with google` }
    } catch (error) {
        console.log(error)
        return { succes: false, message: error }
    }
}

const passwordReset = async (auth, email) => {
    try {
        await sendPasswordResetEmail(auth, email)
        // console.log({ success: true, message: "Password reset email sent!" })
        return { success: true, message: "Password reset email sent!" }
    } catch (error) {
        console.log(error.message)
        return { success: false, message: error.message }
    }
}

const deleteUserAccount = async (auth) => {
    try {
        await deleteUser(auth.currentUser)
        return { success: true, message: "User deleted" }
    } catch (error) {
        console.log(error)
        return { succes: false, message: error }
    }
}

const saveplaylist = async (db, uid, playlistName, songData) => {
    try {
        await setDoc(
            doc(db, `saved-playlists`, uid, 'playlists', playlistName),
            songData
        )
        return `${playlistName} by ${uid} successfully stored`
    } catch (error) {
        console.error(error)
        return undefined
    }
}

const fetchUserPlaylistsTitles = async (db, uid) => {
    try {
        const playlistsRef = collection(db, `saved-playlists`, uid, 'playlists')
        const querySnapshot = await getDocs(playlistsRef)

        const playlistsNames = querySnapshot.docs.map((doc) => doc.id)
        return playlistsNames
    } catch (error) {
        console.error(error)
        return undefined
    }
}

const fetchUserPlaylistsSongs = async (db, uid, playlistName) => {
    try {
        const docRef = doc(db, `saved-playlists`, uid, 'playlists', playlistName)
        const docSnap = await getDoc(docRef)
        return docSnap.exists() ? docSnap.data() : undefined
    } catch (error) {
        console.error(error)
        return undefined
    }
}

const deleteplaylist = async (db, uid, playlistName) => {
    try {
        await deleteDoc(doc(db, `saved-playlists`, uid, 'playlists', playlistName))
        return `Successfully Deleted - Playlist: ${playlistName} by user:${uid}`
    } catch (error) {
        console.error(error)
        return error
    }
}

global.firebaseApp = app
module.exports = {
    signUp,
    signIn,
    passwordReset,
    deleteUserAccount,
    googleSignIn,
    saveplaylist,
    deleteplaylist,
    fetchUserPlaylistsTitles,
    fetchUserPlaylistsSongs,
}