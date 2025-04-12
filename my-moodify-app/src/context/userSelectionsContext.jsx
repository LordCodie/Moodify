import React, { createContext, useContext, useState } from "react";

const UserSelectionsContext = createContext()

export const UserSelectionsProvider = ({ children }) => {
    const [feeling, setFeeling] = useState('')

    return (
        <UserSelectionsContext.Provider value={{ feeling, setFeeling }}>
            {children}
        </UserSelectionsContext.Provider>
    )
}

export const useUserSelections = () => useContext(UserSelectionsContext)