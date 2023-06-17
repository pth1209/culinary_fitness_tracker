import axios from "axios"
import { useState } from "react"
import { getUserId } from "../hooks/getUserId"
import { useNavigate } from "react-router-dom"


export const EnterCalorie= () => {

    const userID = getUserId()

    const getTodayDate = () => {
        const date = new Date()
        return date.toISOString().split("T")[0]
    }

    const [calories, setCalories] = useState({
        loggedCalories: 0,
        loggedUser: userID,
        loggedDate: getTodayDate()
    })

    const handleInputChange = (event) => {
        setCalories((prevState) => ({
            ...prevState,
            loggedCalories: event.target.value
        }))
    }

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault()
        try{
            axios.post("http://localhost:5000/calories/add", calories)
            alert("Calories logged")
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }
    

    return <div className = "logCalories">
        <h2>Enter Calories</h2>
        <form onSubmit = {onSubmit}>
            <label></label>
            <input type= "text" onChange = {handleInputChange}/>
            <button type = "submit" className = "logButton">Log Calories</button>
        </form>
    </div>
}