import { sendMessage } from "../controllers/message.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/message").post(verifyJWT, sendMessage);

export default router;
