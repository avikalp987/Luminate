import express from "express"
import { deleteUser, test, updateUser } from "../controllers/user.controller.js"
import { verifyToken } from "../utils/verifyUser.js"

//defining the router
const router = express.Router()

//defining the route
router.get("/test",test)
router.put("/update/:userId", verifyToken, updateUser)
router.delete("/delete/:userId", verifyToken, deleteUser)

//export the router
export default router