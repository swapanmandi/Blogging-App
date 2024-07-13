import {
  createBlog,
  getBlog,
  editBlog,
  getBlogList,
  editList,
  editView,
  deletePost,
} from "../controllers/blog.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {upload} from '../middlewares/multer.middleware.js'

//const upload = multer()
const router = Router();

router.route("/api/createBlog").post( upload.fields([{name: "featuredImage", maxCount: 1}]), verifyJWT , createBlog);
router.route("/api//:id").get(verifyJWT, getBlog);
router.route("/list").get(getBlogList);
router.route("/api/editList").get(verifyJWT, editList)
router.route("/api/editView/:id").get(verifyJWT, editView);
router.route("/api/edit/:id").put(verifyJWT, editBlog);
router.route("/api/delete/:id").delete(verifyJWT, deletePost);






export default router;
