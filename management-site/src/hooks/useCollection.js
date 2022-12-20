import { useEffect, useState, useRef } from "react"
import { projectFirestore } from "../firebase/config"

export const useCollection = (transaction, _query) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const query = useRef(_query).current

    useEffect(() => {
        let ref = projectFirestore.collection(transaction)

        if (query) {
            ref = ref.where(...query)
        }

        const unsubscribe = ref.onSnapshot(snapshot => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            });

            // update state
            setDocuments(results)
            setError(null)
        }, error => {
            console.log(error)
            setError('could not fetch the data')
        })

        // unsubscribe on unmount
        return () => unsubscribe()

    }, [transaction, query])

    return { documents, error }
}