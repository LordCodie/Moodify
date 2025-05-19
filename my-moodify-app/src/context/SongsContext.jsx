import React, { createContext, useContext, useState } from "react"

const SongsCtx = createContext()

export const SongsProvider = ({ children }) => {
    const [songs, setSongs] = useState(null)
    return (
        <SongsCtx.Provider value={{ songs, setSongs }}>
            {children}
        </SongsCtx.Provider>
    )
}

export const useSongs = () => useContext(SongsCtx)