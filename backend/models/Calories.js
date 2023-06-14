import mongoose from "mongoose";

const CalorieSchema = new mongoose.Schema({
    loggedCalories: {type: Number, required: true},
    loggedUser: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    loggedDate: {type: Date, required: true}
});

export const CalorieModel = mongoose.model("calories", CalorieSchema);