import { Audio } from "react-loader-spinner"
import classes from "./Signup.module.css"
import { useNavigate } from "react-router-dom";
import useSignup from "../../hooks/useSignup"
import { useState } from "react"

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)
    const [condition, setCondition] = useState(null);
    const { signup, isLoading, error } = useSignup();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        signup(email, password, displayName, thumbnail)
        navigate("/dashboard")
    }

    const handleFileChange = (e) => {
        setThumbnail(null)
        let selected = e?.target?.files[0]

        switch (condition) {
            case (!selected):
                setThumbnailError("No file selected")
                alert("No")
                break
            case (!selected.type.includes("image")):
                setThumbnailError("Image type is allowed only")
                break
            case (selected.size > 100000):
                setThumbnailError("File is too large")
                break
            default:
                console.log(thumbnailError)
        }
        setThumbnail(selected)
    }

    return (
        <form onSubmit={handleSubmit} className={classes.authForm}>
            <h2>sign up</h2>
            <label>
                <span>email:</span>
                <input
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>password:</span>
                <input
                    required
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <label>
                <span>display name:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                />
            </label>
            <label>
                <span>Profile thumbnail:</span>
                <input
                    required
                    type="file"
                    onChange={handleFileChange}
                />
                {thumbnailError && <em>{thumbnailError}</em>}
            </label>
            {!isLoading && <button className={classes.btn}>Sign up</button>}
            {error && <em>{error}</em>}
            {isLoading && <div className="d-flex justify-content-center"><Audio height="16px" width="16px" color="#8d69f1" /></div>}
        </form>
    )
}
export default Signup
