import { Router } from "express";
import { createCategory, getCategory } from "../controllers/category.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/create/category").post(verifyJWT, createCategory)
router.route("/get/category").get(verifyJWT, getCategory)

export default router