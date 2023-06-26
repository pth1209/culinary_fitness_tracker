import { useState, useEffect } from "react"
import { getUserId } from "../hooks/getUserId"
import axios from "axios"

export const CalorieList= () => {

    const [loggedCalories, setLoggedCalories] = useState([])
    const userID = getUserId()

    useEffect(() => {
        const getUserCalorie = async() => {
            try {
                const response = await axios.get(`http://localhost:5000/calories/${userID}`)
                setLoggedCalories(response.data)
            } catch (err) {
                console.log(err)
            }
        }

        getUserCalorie();

    }, [])


    return (
        <table className="calorie-table">
          <thead>
            <tr>
              <th>Calories</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {loggedCalories.map((calories) => (
              <tr key={calories._id}>
                <td>{calories.loggedCalories} kcal</td>
                <td>{calories.loggedDate.split("T")[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
      
      
}

