import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
import homeIcon from "../../assets/home.svg";
import useAuthContext from "../../hooks/useAuthContext";
import useLogout from "../../hooks/useLogout";

const Navbar = () => {
    const { user } = useAuthContext()
    const { logout, isLoading } = useLogout()

    return (
        <div className={classes.navbar}>
            <a href="/dashboard" className={classes.mainLogo}>
                <img src={homeIcon} alt="home-icon" className="ms-3" />
                <span className="my-auto"> Management site</span>
            </a>
            <div className={`my-auto me-5 ${classes.links}`}>
                {!user ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>) :
                    !isLoading ? <button onClick={logout} className={classes.btn}>Logout</button> : <em>Logging out</em>}
            </div>
        </div>
    );
};

export default Navbar;
