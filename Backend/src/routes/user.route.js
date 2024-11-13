import {
  signupUser,
  signupAdmin,
  signinUser,
  adminSignin,
  logoutUser,
  setAvatarImage,
  refreshAccessToken,
  getProfile,
  protectedRoute,
  updateAccount,
  changePassword,
  fetchAdminProfile
} from "../controllers/user.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/signup").post(signupUser);
router.route("/admin/signup").post(signupAdmin);
router.route("/signin").post(signinUser);
router.route("/admin/signin").post(adminSignin)
router.route("/signout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/profile").get(verifyJWT, getProfile);
router.route("/admin/profile").get(verifyJWT, fetchAdminProfile)
router.route("/protected").get( verifyJWT, protectedRoute)
router.route("/account-update").post(verifyJWT, updateAccount);
router
  .route("/avatar")
  .post(
    upload.fields([{ name: "avatar", maxCount: 1 }]),
    verifyJWT,
    setAvatarImage
  );

  router.route("/password-change").post(verifyJWT, changePassword)


  

export default router;
