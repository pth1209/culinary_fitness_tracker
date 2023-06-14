import axios from "axios"
import { useState } from "react"
import { getUserId } from "../hooks/getUserId"


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
        setCalories(event.target.value)
    }
    

    return <div className = "logCalories">
        <h2>Enter Calories</h2>
        <form>
            <label></label>
            <input type= "text" onChange = {handleInputChange}/>
            <button type = "submit" className = "logButton">Log Calories</button>
        </form>
    </div>
}