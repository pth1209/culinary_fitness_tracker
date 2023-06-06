import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <div className = "Navbar">
            <Link to = "/">Home</Link>
            <Link to = "/auth">Login/Register</Link>
            <Link to = "/create-recipe">Create Recipe</Link>
            <Link to = "/saved-recipe">Saved Recipe</Link>
            <Link to = "/enter-calorie">Log Calories</Link>
            <Link to = "/calorie-list">Calories</Link>
        </div>
    )
}