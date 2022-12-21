import AddIcon from "../../assets/addIcon.svg"
import DashboardIcon from "../../assets/dashboardIcon.svg"
import { NavLink } from "react-router-dom"
import classes from "./Sidebar.module.css"

const Sidebar = () => {
    return (
        <div className={classes.sidebar}>
            <div className={classes.heading}>
                <span className="">Hello, user name!!!</span>
            </div>
            <nav className={classes.links}>
                <ul>
                    <li>
                        <NavLink to="/">
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
