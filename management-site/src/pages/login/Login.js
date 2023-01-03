import { Audio } from "react-loader-spinner";
import classes from "./Login.module.css";
import useLogin from "../../hooks/useLogin";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { isLoading, error, login } = useLogin()

    // handle event after clicking on submit button
    const handleSubmit = async (e) => {
        e.preventDefault();
        login(email, password)
    };

    return (
        <form onSubmit={handleSubmit} className={classes.login}>
            <h5>Login</h5>
            <label>
                <span>Email:</span>
                <input
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>Password:</span>
                <input
                    required
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            {isLoading ? (
                <div className="d-flex justify-content-center">
                    <Audio height="18px" width="18px" color="purple" />
                </div>
            ) : (
                <button type="submit" className={classes.btn}>
                    Login
                </button>
            )}
            {error && <em>{error}</em>}
        </form>
    );
};

export default Login;