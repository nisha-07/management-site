import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
import homeIcon from "../../assets/home.svg";

const Navbar = () => {
    return (
        <div className={classes.navbar}>
            <a href="/" className={classes.mainLogo}>
                <img src={homeIcon} alt="home-icon" className="ms-3" />
                <span className="my-auto"> Management site</span>
            </a>
            <div className={`my-auto me-5 ${classes.links}`}>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/">Logout</Link>
            </div>
        </div>
    );
};

export default Navbar;
