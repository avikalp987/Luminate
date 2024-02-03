import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import postRouter from "./routes/post.route.js"
import commentRouter from "./routes/comment.route.js"

import cookieParser from "cookie-parser"

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

//allowing the backend to use the json
app.use(express.json())

app.use(cookieParser())

//listening to the port
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})


app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/post", postRouter)
app.use("/api/comment", commentRouter)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error"

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})