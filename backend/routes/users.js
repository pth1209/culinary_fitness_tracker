import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {UserModel} from "../models/Users.js"

const router = express.Router()

router.post("/register", async (req, res) => {
    const { username, password} = req.body;
    const user = await UserModel.findOne({username});

    if (user) {
        return res.json({message: "User / username already exists!"})
    }

    const safePassword = await bcrypt.hash(password, 10) 
    
    //add user to the database
    const newUser = new UserModel({username, password: safePassword});
    await newUser.save()

    res.json({message: "User registered successfully!"});
});

router.post("/login", async (req, res) => {
    const { username, password} = req.body;
    const user = await UserModel.findOne({username});

    if (!user) {
        return res.json({message: "User does not exist!"})
    }

    const passwordTrue = await bcrypt.compare(password, user.password);

    if (!passwordTrue) {
        return res.json({message: "Username or passowrd is incorrect!"})
    }

    const token = jwt.sign({id: user._id}, "secret");
    res.json({token, userID: user._id})
});


export {router as UserRouter}