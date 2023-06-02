import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"

import { UserRouter } from "./routes/users.js "

dotenv.config()

const app = express();

const port = process.env.PORT

const uri = process.env.DB_URI

//data from the frontend is changed into a json format
app.use(express.json());
app.use(cors());

app.use("/auth", UserRouter);

mongoose.connect(uri);

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
