import express from "express"
import { test } from "../controllers/user.controller.js"

//defining the router
const router = express.Router()

//defining the route
router.get("/test",test)

//export the router
export default router