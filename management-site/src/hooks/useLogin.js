import { projectAuth, projectFirestore } from "../firebase/config"
import { useEffect, useState } from "react"

import useAuthContext from "./useAuthContext"
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)

    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate();

    const login = async (email, password) => {
        setError(null)
        setIsLoading(true)

        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password)
            await projectFirestore.collection("users").doc(res.user.uid).update({ online: true })

            // dispatch login funtion
            dispatch({ type: "LOGIN", payload: res.user })

            if (isCancelled) {
                setIsLoading(false)
                setError(null)
            }
            navigate("/dashboard")
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
