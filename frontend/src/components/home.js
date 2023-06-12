import { useState, useEffect } from "react"
import axios from "axios"
import { getUserId } from "../hooks/getUserId";

export const Home = () => {
    const [recipes, setRecipes] = useState([]);

    const userID = getUserId();

    useEffect(() => {

        const getRecipe = async () => {
            try {
                const response = await axios.get("http://localhost:5000/recipes");
                setRecipes(response.data)   
            } catch (error) {
                console.log(error);
            }
        }
        getRecipe()
    });



    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.get("http://localhost:5000/recipes", {recipeID, userID});
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
          <h1>Recipes</h1>
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe._id}>
                <div>
                  <h2>{recipe.name}</h2>
                  <button>Save Recipe</button>
                </div>
                <div className="instructions">
                  <p>{recipe.instructions}</p>
                </div>
                <img src={recipe.imageUrl} alt={recipe.name} />
                <p>Cooking Time: {recipe.time} minutes</p>
                <p>Calories: {recipe.calories} kcal</p>
              </li>
            ))}
          </ul>
        </div>
      );
}