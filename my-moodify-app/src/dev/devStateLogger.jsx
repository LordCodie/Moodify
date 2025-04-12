import { useEffect } from "react";
import { useUserSelections } from "@/context/userSelectionsContext";

const DevStateLogger = () => {
    const state = useUserSelections()

    const { feeling } = state

    useEffect(() => {
        console.log('User Selections:', feeling)
        console.log(state)
    }, [state])

    return null
}

export default DevStateLogger