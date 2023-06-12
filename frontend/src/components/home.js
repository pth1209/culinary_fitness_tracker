import { useState, useEffect } from "react"
import axios from "axios"
import { getUserId } from "../hooks/getUserId";

export const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);

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

        const getSavedRecipe = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/recipes/savedRecipes/id/${userID}`)
            setSavedRecipes(response.data.savedRecipes)
          } catch (err) {
            console.log(err);
          }
        };
        getRecipe()
        getSavedRecipe() 
    }, []);

    const saveRecipe = async (recipeID) => {
      try {
        const response = await axios.put("http://localhost:5000/recipes", {recipeID, userID})
        setSavedRecipes(response.data.savedRecipes)
      } catch (error) {
        console.log(error);
      }
    };

    const isRecipeSaved = (id) => savedRecipes.includes(id);

    return (
        <div>
          <h1 className = "home-header">Recipes</h1>
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe._id}>
                <div>
                  <h2>{recipe.name}</h2>
                  <button onClick={() => saveRecipe(recipe._id)} disabled = {isRecipeSaved(recipe._id)}>
                    {isRecipeSaved(recipe._id) ? "Recipe Saved": "Save Recipe"}
                  </button>
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