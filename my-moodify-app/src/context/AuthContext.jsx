import React, { createContext, useContext, useState, useEffect } from "react";
import {
    auth,
    signUp,
    signIn,
    signUserOut,
    passwordReset,
    googleSignIn
} from "@/utilities/firebase/firebase-client"
import { onAuthStateChanged } from 'firebase/auth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    console.log("auth state:", currentUser ? 'signed-in' : 'signed-out')

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [currentUser])

    const signup = (email, password, username) => signUp(email, password, username)
    const signin = (email, password) => signIn(email, password)
    const signout = () => signUserOut()
    const passwordreset = email => passwordReset(email)
    const googlesignin = () => googleSignIn()

    const value = {
        currentUser,
        signup,
        signin,
        signout,
        passwordreset,
        googlesignin
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)