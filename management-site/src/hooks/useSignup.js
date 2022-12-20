import { useEffect, useState } from "react"

import { projectAuth } from "../firebase/config"
import useAuthContext from "./useAuthContext"

const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName) => {
        setError(null)
        setIsLoading(true)

        try {
            // signup
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)

            if (!res) {
                throw new Error('Could not complete signup')
            }

            // add display name to user
            await res.user.updateProfile({ displayName })

            // dispatch login action
            dispatch({ type: "LOGIN", payload: res.user })

            if (isCancelled) {
                setIsLoading(false)
                setError(null)
            }
        }
        catch (err) {
            if (isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsLoading(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { signup, error, isLoading }
}

export default useSignup
