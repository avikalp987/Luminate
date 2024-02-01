import express from "express"
import { test, updateUser } from "../controllers/user.controller.js"
import { verifyToken } from "../utils/verifyUser.js"

//defining the router
const router = express.Router()

//defining the route
router.get("/test",test)
router.put("/update/:userId", verifyToken, updateUser)

//export the router
export default router