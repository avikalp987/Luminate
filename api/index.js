import express from "express"

//creating the application
const app = express()

//listening to the port
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})