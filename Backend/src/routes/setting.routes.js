import { setting, getSettings } from "../controllers/setting.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/setting")
  .post(upload.fields([{ name: "siteIcon", maxCount: 1 }]), verifyJWT, setting);
router.route("/get-settings").get(verifyJWT, getSettings);

export default router;
