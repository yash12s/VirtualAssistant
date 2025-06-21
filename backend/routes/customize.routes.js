import express from "express"
import upload from "../middlewares/multer.js"
import isAuth from "../middlewares/isAuth.js"
import { customizeAssistant } from "../controllers/customize.controllers.js"

const customizeRouter = express.Router()

customizeRouter.post("/", isAuth, upload.single("image"), customizeAssistant)

export default customizeRouter
