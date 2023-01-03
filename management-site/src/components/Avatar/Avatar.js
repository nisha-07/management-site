import classes from "./Avatar.module.css"

const Avatar = ({ src, name }) => {

    return (
        <div>
            <img src={src} alt="Avatar" className="mx-auto" />
            <div className={classes.heading}>
                <span>Hello, {name}!!!</span>
            </div>
        </div>
    )
}

export default Avatar
