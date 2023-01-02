import { projectAuth, projectFirestore, projectStorage } from "../firebase/config"
import { useEffect, useState } from "react"

import useAuthContext from "./useAuthContext"

const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName, thumbnail) => {
        setError(null)
        setIsLoading(true)

        try {
            // signup
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)

            if (!res) {
                throw new Error('Could not complete signup')
            }

            // upload user thumbnail
            const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
            const img = await projectStorage.ref(uploadPath).put(thumbnail)
            const imgUrl = await img.ref.getDownloadURL()

            // add display name to user
            await res.user.updateProfile({ displayName, photoURL: imgUrl })

            await projectFirestore.collection("users").doc(res.user.uid).set({
                online: true,
                displayName,
                photoURL: imgUrl,
            })

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
