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

    const [savedCalories, setSavedCalories] = useState([])

    const handleInputChange = (event) => {
        setCalories((prevState) => ({
            ...prevState,
            loggedCalories: event.target.value
        }))
    }

    const navigate = useNavigate();

    const logCalorie = async (event) => {
        event.preventDefault()
        try{
            const response = await axios.post("http://localhost:5000/calories/add", calories)
            alert("Calories logged")
            console.log(response.data.loggedUser)
            await saveCalorie(response.data.loggedUser);
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

    const saveCalorie = async (calorieID) => {
        try {
            const response = await axios.put("http://localhost:5000/calories/", {calorieID})
            setSavedCalories(response.data.calories || [])
        } catch (err) {
            console.log(err)
        }
    }
    

    return <div className = "logCalories">
        <h2>Enter Calories</h2>
        <form onSubmit = {logCalorie}>
            <label></label>
            <input type= "text" onChange = {handleInputChange}/>
            <button 
            type = "submit" className = "logButton">Log Calories</button>
        </form>
    </div>
}