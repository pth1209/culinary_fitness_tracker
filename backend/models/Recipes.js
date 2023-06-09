import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    ingredients: [{type: String, required: true, }],
    instructions: {type: String, required: true},
    imageUrl: {type: String, required: true},
    time: {type: Number, required: true},
    makerUser: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    calories: {type: Number, required: true}
});

export const RecipeModel = mongoose.model("recipe", RecipeSchema);