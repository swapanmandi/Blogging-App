import {
  createBlog,
  //getBlog,
  getBlogList,
  allPostList,
  editPost,
  editView,
  deletePost,
  draftPosts,
} from "../controllers/blog.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {upload} from '../middlewares/multer.middleware.js'

//const upload = multer()
const router = Router();

router.route("/api/createBlog").post( upload.fields([{name: "featuredImage", maxCount: 1}]), verifyJWT , createBlog);
//router.route("/api//:id").get(getBlog);
router.route("/list").get(getBlogList);
router.route("/api/allPostList").get(verifyJWT, allPostList)
router.route("/api/editView/:id").get(verifyJWT, editView);
router.route("/api/edit/:id").put( upload.fields([{name: "featuredImage", maxCount: 1}]), verifyJWT, editPost);
router.route("/api/delete/:id").delete(verifyJWT, deletePost);
router.route("/api/draftpost").get(verifyJWT, draftPosts)






export default router;
