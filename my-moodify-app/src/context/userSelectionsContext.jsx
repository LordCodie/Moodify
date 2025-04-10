import React, { createContext, useContext, useState } from "react";

const UserSelectionsContext = createContext()

export const UserSelectionsProvider = ({ children }) => {
    const [genre, setGenre] = useState('');
    const [acousticness, setAcousticness] = useState(0);
    const [danceability, setDanceability] = useState(0);
    const [energy, setEnergy] = useState(0);
    const [instrumentalness, setInstrumentalness] = useState(0);
    const [emotion, setEmotion] = useState('');
    const [popularity, setPopularity] = useState(50);

    const value = {
        genre, setGenre,
        acousticness, setAcousticness,
        danceability, setDanceability,
        energy, setEnergy,
        instrumentalness, setInstrumentalness,
        emotion, setEmotion,
        popularity, setPopularity
    }

    return (
        <UserSelectionsContext.Provider value={value}>
            {children}
        </UserSelectionsContext.Provider>
    )
}

export const useUserSelections = () => useContext(UserSelectionsContext)