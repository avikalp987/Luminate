import mongoose from "mongoose";

//defining the schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
},{ timestamps: true })

//creating the model
const User = mongoose.model("User", userSchema)


//exporting the model
export default User

