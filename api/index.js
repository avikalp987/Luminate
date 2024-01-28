import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/user.route.js"

//configuring the dotenv
dotenv.config()

//connecting to the database
mongoose
.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to database")
})
.catch((err) => {
    console.log(err)
})


//creating the application
const app = express()

//listening to the port
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})


//test api route
app.use("/api/user", userRouter)