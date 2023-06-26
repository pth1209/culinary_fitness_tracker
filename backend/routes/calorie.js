import express from "express"
import {CalorieModel} from "../models/Calories.js"
import { UserModel } from "../models/Users.js"
import mongoose from "mongoose";

const router = express.Router()

router.post("/add", async (req, res) => {
    const calories = new CalorieModel(req.body)
    try {
        const response = await calories.save({})
        res.json(response)
    } catch (error) {
        res.json(error)
    }
})

router.put("/", async (req, res) => {
    const calorie = await CalorieModel.findOne({ loggedUser: req.body.calorieID });
    const user = await UserModel.findById(req.body.calorieID);
    user.calories.push(calorie)
    await user.save();
    res.json({calories: user.calories})
    // if (mongoose.Types.ObjectId.isValid(calorieID)) {
    //     const calorie = await CalorieModel.findOne({ loggedUser: req.body.calorieID });
    // } else {
    //     console.log("invalid")
    // }
//     try {
//         console.log('Calorie ID:', req.body.calorieID)
//         const calorie = await CalorieModel.findById(req.body.calorieID)
//         console.log(calorie)
//         const user = await UserModel.findById(req.body.userID)
//         user.calories.push(calorie)
//         await user.save();
//         res.json({calories: user.calories})   
//     } catch (err) {
//     console.log(err)
// }
})

router.get("/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        console.log(user)
        const savedCalories = await CalorieModel.find({
            _id: {$in : user.calories}
        })
        res.json(savedCalories)
    } catch (error) {
        res.json(error)
    }
})

export {router as CalorieRouter}