import express from "express"
import {CalorieModel} from "../models/Calories.js"
import { UserModel } from "../models/Users.js"

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

router.get("/:ID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        res.json({calories: user?.calories})
    } catch (error) {
        res.json(error)
    }
})

export {router as CalorieRouter}