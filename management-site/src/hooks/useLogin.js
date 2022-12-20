import { useEffect, useState } from "react"

import { projectAuth } from "../firebase/config"
import useAuthContext from "./useAuthContext"

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsLoading(true)

        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password)

            // dispatch login funtion
            dispatch({ type: "LOGIN", payload: res.user })

            if (isCancelled) {
                setIsLoading(false)
                setError(null)
            }
        }

        catch (err) {
            if (isCancelled) {
                console.log(err)
                setIsLoading(false)
                setError(err.message)
            }
        }
    }
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { isLoading, error, login }
}

export default useLogin
