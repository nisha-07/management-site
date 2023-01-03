import AddIcon from "../../assets/addIcon.svg"
import Avatar from "../Avatar/Avatar"
import DashboardIcon from "../../assets/dashboardIcon.svg"
import { NavLink } from "react-router-dom"
import classes from "./Sidebar.module.css"
import useAuthContext from "../../hooks/useAuthContext"

const Sidebar = () => {
    const { user } = useAuthContext()

    return (
        <div className={classes.sidebar}>
            <Avatar src={user?.photoURL} name={user?.displayName} />
            <nav className={classes.links}>
                <ul>
                    <li>
                        <NavLink to="/dashboard">
                            <img src={DashboardIcon} alt="dashboard icon" />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/create">
                            <img src={AddIcon} alt="add project icon" />
                            <span>New Project</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
