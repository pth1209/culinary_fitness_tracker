import { useState, useEffect } from "react"
import axios from "axios"
import { getUserId } from "../hooks/getUserId";

export const SavedRecipe = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);

    const userID = getUserId();

    useEffect(() => {
        const getSavedRecipe = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/recipes/savedRecipes/${userID}`)
            setSavedRecipes(response.data.savedRecipes)
          } catch (err) {
            console.log(err);
          }
        };
        getSavedRecipe() 
    }, []);

    return (
        <div>
          <h1 className = "home-header">Saved Recipes</h1>
          <ul>
            {savedRecipes.map((recipe) => (
              <li key={recipe._id}>
                <div>
                  <h2>{recipe.name}</h2>
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