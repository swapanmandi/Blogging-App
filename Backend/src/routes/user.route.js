import {
  signupUser,
  signinUser,
  logoutUser,
  protectedRote,
} from "../controllers/user.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(signupUser);
router.route("/signin").post(signinUser);
router.route("/signout").post(verifyJWT, logoutUser);
router.route("/protected").get( verifyJWT, protectedRote)

export default router;


