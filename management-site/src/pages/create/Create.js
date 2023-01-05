import { useEffect, useMemo, useState } from "react"

import SelectDropdown from "../../components/SelectDropdown/SelectDropdown"
import classes from "./Create.module.css"
import useAuthContext from "../../hooks/useAuthContext"
import { useCollection } from "../../hooks/useCollection"

const Create = () => {
    const [name, setName] = useState("")
    const [details, setDetails] = useState("")
    const [date, setDate] = useState("")
    const [category, setCategory] = useState("")
    const [assignedUsers, setAssignedUsers] = useState([])
    const [formError, setFormError] = useState(null)


    const users = useMemo(() => [], [])

    const options = [
        { value: "design", label: "Design" },
        { value: "development", label: "Development" },
        { value: "sales", label: "Sales" },
        { value: "marketing", label: "Marketing" },
    ]

    const { documents } = useCollection("users")
    const { user } = useAuthContext()

    useEffect(() => {
        documents && documents.map((doc) => users.push({ "value": { ...doc, id: doc?.id }, "label": user?.displayName }))
    }, [users])

    // handle event onclick of add project button
    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError(null)

        if (!category) {
            setFormError('Please select a project category.')
            return
        }
        if (assignedUsers.length < 1) {
            setFormError('Please assign the project to at least 1 user')
            return
        }

        const assignedUsersList = assignedUsers.map(u => {
            return {
                displayName: u.value.displayName,
                photoURL: u.value.photoURL,
                id: u.value.id
            }
        })
        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }

        const project = {
            name,
            details,
            category: category,
            /** 
            *ToDo: Check the date and its formate
            */
            date: date,
            assignedUsersList,
            createdBy,
            comments: []
        }

        console.log(project)


    }

    const clearAllFields = () => {
        setName("")
        setDetails("")
        setDate("")
        /**
         *ToDo: clear category and assign users
         *ToDO: user details in assignuserlist object
         */
    }

    return (
        <div className={classes.container}>
            <h5>Create a new project</h5>
            <form className={classes.form} onSubmit={handleSubmit}>
                <label>
                    <span>Project name:</span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Project details:</span>
                    <textarea
                        required
                        type="textarea"
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                    />
                </label>
                <label>
                    <span>Set due date:</span>
                    <input
                        required
                        type="date"
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                    />
                </label>
                <label>
                    <span>Project category:</span>
                    <SelectDropdown
                        options={options}
                        placeholder="Select a category"
                        onChange={(op) => setCategory(op.value)}
                    />
                </label>
                <label>
                    <span>Assign to:</span>
                    <SelectDropdown
                        options={users}
                        placeholder="Select users"
                        onChange={(op) => setAssignedUsers(op)}
                        isMulti={true}
                    />
                </label>
                <button type="submit" className={classes.btn}>
                    Add Project
                </button>
                <button className={classes.btn} onClick={clearAllFields}>
                    Clear All
                </button>
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    )
}

export default Create
