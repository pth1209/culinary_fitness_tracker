import {useState} from "react";
import axios from "axios";
import { getUserId } from "../hooks/getUserId";
import { useNavigate } from "react-router-dom";

export const CreateRecipe = () => {
    const userID = getUserId()
    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        time: 0,
        makerUser: userID,
    })

    const handleChange = (event) => {
        const {name, value} = event.target;
        setRecipe({...recipe, [name]: value})
    }

    const addIngredient = () => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]})
    }

    const handleIngredient = (event, idx) => {
        const {value} = event.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value;
        setRecipe({...recipe, ingredients: ingredients})
    }

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            axios.post("http://localhost:5000/recipes/", recipe);
            alert("Recipe created")
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return <div className = "createRecipe">
        <h2>Create Recipe</h2>
        <form onSubmit = {onSubmit}>
            <label htmlFor = "name">Name</label>
            <input type= "text" id = "name" name = "name" onChange = {handleChange}/>
            <label htmlFor = "ingredients">Ingredients</label>
            {recipe.ingredients.map((ingredient, idx) => (
                <input 
                key = {idx} 
                type = "text" 
                name = "ingredients" 
                value = {ingredient}
                onChange = {(event) =>  handleIngredient(event, idx)}/>
            ))}
            <button onClick = {addIngredient} type = "button">Add Ingredient</button>
            <label htmlFor = "instructions">Instructions</label>
            <textarea id = "instructions" name = "instructions" onChange = {handleChange}></textarea>
            <label htmlFor = "imageUrl">ImageUrl</label>
            <input type= "text" id = "imageUrl" name = "imageUrl" onChange = {handleChange}/>
            <label htmlFor = "time">Cooking Time (minutes)</label>
            <input type = "number" id = "time" name = "time" onChange = {handleChange}/>
            <button type = "submit">Create Recipe</button>
        </form>
    </div>
}