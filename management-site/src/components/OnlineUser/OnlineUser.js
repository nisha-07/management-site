import classes from "./OnlineUser.module.css"
import { useCollection } from "../../hooks/useCollection"

const OnlineUser = () => {
    const { documents } = useCollection("users")

    return (
        <div className={classes.users}>
            <h5>Users</h5>
            {documents && documents.map((doc) => {
                return (
                    <div key={doc?.id}>
                        <p>{doc?.displayName}</p>
                        <img src={doc?.photoURL} alt="avatar" />
                        {doc?.online ? <div className={classes.activeDot}></div> : <div className={classes.dot} />}
                    </div>
                )
            })}
        </div>
    )
}

export default OnlineUser
