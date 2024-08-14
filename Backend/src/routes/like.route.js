import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { togglePostLike, getLiked } from "../controllers/like.controller.js";

const router = Router();

router.route("/post/like/:id").post(verifyJWT, togglePostLike);
router.route("/post/liked/:id").get(verifyJWT, getLiked);

export default router;
