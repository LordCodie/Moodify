// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
} from "firebase/auth"
import {
    getFirestore,
    setDoc,
    doc,
    getDoc,
    getDocs,
    collection,
    deleteDoc
} from "firebase/firestore"

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

export const auth = getAuth()
const db = getFirestore()

// const baseUrl =
//     process.env.NODE_ENV === 'production'
//         ? 'https://your-app.vercel.app'
//         : 'http://localhost:5173'

const baseUrl = 'http://localhost:5173'

const actionCodeSettings = {
    url: `${baseUrl}/login`,
    handleCodeInApp: true,
}

export const signUp = async (email, password, username) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(auth.currentUser, { displayName: username })
        await sendEmailVerification(user, actionCodeSettings)
        await signOut(auth)
        return { success: true, message: `User succesfully signed-up` }
    } catch (error) {
        console.log(error)
        return { success: false, message: error.message }
    }
}

export const signIn = async (email, password) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)

        if (!user.emailVerified) {
            await signOut(auth)
            return {
                succes: false,
                message: "Please verify your email before signing in."
            }
        }

        return { success: true, message: `User succesfully signed-in` }
    } catch (error) {
        console.log(error)
        return { success: false, message: error.message }
    }
}

export const signUserOut = async () => {
    try {
        await signOut(auth)
        return { success: true, message: 'User is logged out' }
    } catch (error) {
        console.log(error)
        return { success: false, message: error }
    }
}

export const passwordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email)
        // console.log({ success: true, message: "Password reset email sent!" })
        return { success: true, message: "Password reset email sent!" }
    } catch (error) {
        console.log(error.message)
        return { success: false, message: error.message }
    }
}

export const googleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
        await signInWithPopup(auth, provider)
        return { success: true, message: `User signed-in with google` }
    } catch (error) {
        console.log(error)
        return { success: false, message: error }
    }
}

export const saveplaylist = async (uid, playlistName, songData) => {
    const data = {
        ownerId: uid,
        playlistName,
        songData
    }

    try {
        await setDoc(doc(db, `saved-playlists`, uid, 'playlists', playlistName), data)
        return { success: true, message: `${playlistName} by ${uid} successfully stored` }
    } catch (error) {
        console.error(error)
        return { success: false, message: error }
    }
}

export const fetchUserPlaylistsTitles = async (uid) => {
    try {
        const playlistsRef = collection(db, `saved-playlists`, uid, 'playlists')
        const querySnapshot = await getDocs(playlistsRef)

        const playlistsNames = querySnapshot.docs.map((doc) => doc.id)

        return {
            success: true,
            data: playlistsNames,
            message: `${playlistsNames.length} playlist names returned`
        }
    } catch (error) {
        console.error(error)
        return { success: false, message: error }
    }
}

export const fetchUserPlaylistsSongs = async (uid, playlistName) => {
    let docSnapShot
    try {
        const docRef = doc(db, `saved-playlists`, uid, 'playlists', playlistName)
        const docSnap = await getDoc(docRef)
        docSnapShot = docSnap.exists() ? docSnap.data() : undefined
        return { success: true, data: docSnapShot, message: `Fetched songs from ${playlistName}` }
    } catch (error) {
        console.error(error)
        return { success: false, data: undefined, message: error }
    }
}

export const deleteplaylist = async (uid, playlistName) => {
    try {
        await deleteDoc(doc(db, `saved-playlists`, uid, 'playlists', playlistName))
        return {
            success: true,
            message: `Successfully Deleted - Playlist: ${playlistName} by user:${uid}`
        }
    } catch (error) {
        console.error(error)
        return { success: false, message: error }
    }
}
