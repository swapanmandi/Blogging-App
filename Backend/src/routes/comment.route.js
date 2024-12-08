import { Router } from "express";
import {
  addComment,
  getComments,
  getCommentDashboardData,
} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/post/comment/:id").post(verifyJWT, addComment);
router.route("/post/comments/:id").get(getComments);
router.route("/comments-count").get(verifyJWT, getCommentDashboardData);

export default router;
