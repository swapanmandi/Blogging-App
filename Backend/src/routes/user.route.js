import {
  signupUser,
  signupAdmin,
  signinUser,
  logoutUser,
  setAvatarImage,
  refreshAccessToken,
  getProfile,
  updateAccount,
} from "../controllers/user.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/signup").post(signupUser);
router.route("/admin/signup").post(signupAdmin);
router.route("/signin").post(signinUser);
router.route("/signout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/profile").get(verifyJWT, getProfile);
//router.route("/protected").get( verifyJWT, protectedRote)
router.route("/account-update").post(verifyJWT, updateAccount);
router
  .route("/avatar")
  .post(
    upload.fields([{ name: "avatar", maxCount: 1 }]),
    verifyJWT,
    setAvatarImage
  );

export default router;
