import SelectDropdown from "../../components/SelectDropdown/SelectDropdown"
import classes from "./Create.module.css"
import { useState } from "react"

const Create = () => {
    const [name, setName] = useState("")
    const [details, setDetails] = useState("")
    const [date, setDate] = useState("")
    const [category, setCategory] = useState("")
    const [assignedUsers, setAssignedUsers] = useState([])

    const options = [
        { value: "Design", label: "Design" },
        { value: "Development", label: "Development" }
    ]

    // handle event onclick of add project button
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(name, details, date, category, "Project details")
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
                    <SelectDropdown options={options} placeholder="Select a category" onChange={(op) => setCategory(op.value)} />
                </label>
                <label>
                    <span>Assign to:</span>
                </label>
                <button type="submit" className={classes.btn}>
                    Add Project
                </button>
            </form>
        </div>
    )
}

export default Create
