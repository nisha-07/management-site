import { projectFirestore, timestamp } from "../firebase/config"
import { useEffect, useReducer, useState } from "react"

let initialState = {
    document: null,
    isLoading: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case "IS_LOADING":
            return { success: false, isLoading: true, error: null, document: null }
        case "ERROR":
            return { success: false, isLoading: false, error: action.payload, document: null }
        case "ADDED_DOCUMENT":
            return { success: true, isLoading: false, error: null, document: action.payload }
        case "DELETED_DOCUMENT":
            return { success: true, isLoading: false, error: null, document: action.payload }
        default:
            return state
    }
}

const useFirestore = (transaction) => {
    const [state, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    // collection ref
    const ref = projectFirestore.collection(transaction)

    // add a document
    const addDocument = async (doc) => {
        dispatch({ type: "IS_LOADING" })

        try {
            const createdAt = timestamp.fromDate(new Date())
            const addedDocument = await ref.add({ ...doc, createdAt })
            !isCancelled && dispatch({ type: "ADDED_DOCUMENT", payload: addedDocument })
        }

        catch (err) {
            !isCancelled && dispatch({ type: "ERROR", payload: err.message })
        }
    }

    // delete a document
    const deleteDocument = async (id) => {
        dispatch({ type: "IS_LOADING" })

        try {
            const deletedDocument = await ref.doc(id).delete()
            !isCancelled && dispatch({ type: "DELETED_DOCUMENT", palyload: deletedDocument })
        }
        catch (err) {
            !isCancelled && dispatch({ type: "ERROR", payload: err.message })
        }
    }

    useEffect(() => {
        return () => setIsCancelled(false)
    }, [])

    return { addDocument, deleteDocument, state }
}

export default useFirestore
