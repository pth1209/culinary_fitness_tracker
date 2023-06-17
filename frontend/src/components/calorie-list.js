import { useState } from "react"
import { getUserId } from "../hooks/getUserId"

export const CalorieList= () => {

    const [loggedCalories, setLoggedCalories] = useState([])
    const userID = getUserId()

    useEffect(() => {

    }, [])




    return <div>CalorieList</div>
}

