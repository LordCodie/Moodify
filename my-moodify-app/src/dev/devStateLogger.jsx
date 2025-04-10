import { useEffect } from "react";
import { useUserSelections } from "@/context/userSelectionsContext";

const DevStateLogger = () => {
    const state = useUserSelections()

    const {
        genre,
        acousticness,
        danceability,
        energy,
        instrumentalness,
        emotion,
        popularity
    } = state

    useEffect(() => {
        console.log('User Selections:', {
            genre,
            acousticness,
            danceability,
            energy,
            instrumentalness,
            emotion,
            popularity
        })

        console.log(state)
    }, [state])

    return null
}

export default DevStateLogger