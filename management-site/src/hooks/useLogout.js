import { useEffect, useState } from "react"

import { projectAuth, projectFirestore } from "../firebase/config"
import useAuthContext from "./useAuthContext"

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch, user } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsLoading(true)

        try {
            const { uid } = user;
            await projectFirestore.collection("users").doc(uid).update({ online: false })
            await projectAuth.signOut()

            // dispatch logout funtion
            dispatch({ type: "LOGOUT" })

            if (isCancelled) {
                setIsLoading(false)
                setError(null)
            }
        }

        catch (err) {
            if (isCancelled) {
                console.log(err)
                setError(err.message)
                setIsLoading(false)
            }
        }
    }
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { isLoading, error, logout }
}

export default useLogout
