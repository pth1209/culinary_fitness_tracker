import express from "express"
import mongoose from "mongoose"
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";

const router = express.Router()

router.get("/", async (req,res) => {
    try { 
        //find all recipes
        const response = await RecipeModel.find({});
        res.json(response);
    } catch (error) {
        res.json(error);
    }
})

router.post("/", async (req,res) => {
    const recipe = new RecipeModel(req.body)
    try { 
        const response = await recipe.save({});
        res.json(response);
    } catch (error) {
        res.json(error);
    }
})

router.put("/", async (req,res) => {
    try { 
        const recipe = await RecipeModel.findById(req.body.recipeID)
        const user = await UserModel.findById(req.body.userID)
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({savedRecipes: user.savedRecipes});
    } catch (error) {
        res.json(error);
    }
})

router.get("/savedRecipes/id/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        res.json({savedRecipes: user?.savedRecipes})
    } catch (error) {
        res.json(error);
    }
})

router.get("/savedRecipes/", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID)
        const savedRecipes = await RecipeModel.find({
            _id: {$in : user.savedRecipes}
        })
        res.json({savedRecipes})
    } catch (error) {
        res.json(error);
    }
})

export {router as RecipeRouter}