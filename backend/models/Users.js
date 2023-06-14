import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, uniue: true},
    password: {type: String, required: true},
    savedRecipes: [{type: mongoose.Schema.Types.ObjectId, ref: "recipes"}],
    calories: [{type: mongoose.Schema.Types.ObjectId, ref: "calories"}]
});

export const UserModel = mongoose.model("users", UserSchema);