import {
  readLaterPosts,
  getReadLaterPosts,
  getSavedStatus
} from "../controllers/readLater.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.route("/post/save-post/:id").post(verifyJWT, readLaterPosts);
router.route("/posts/saved-posts").get(verifyJWT, getReadLaterPosts);
router.route("/post/saved-status/:id").get(verifyJWT, getSavedStatus)



export default router;
