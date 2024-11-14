import {
  createBlog,
  //getBlog,
  getBlogList,
  allPostList,
  editPost,
  editView,
  deletePost,
  draftPosts,
  popularPosts,
  trendingPosts,
  views,
  
} from "../controllers/blog.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {upload} from '../middlewares/multer.middleware.js'

//const upload = multer()
const router = Router();

router.route("/createBlog").post( upload.fields([{name: "featuredImage", maxCount: 1}]), verifyJWT , createBlog);
//router.route("/api//:id").get(getBlog);
router.route("/list").get(getBlogList);
router.route("/allPostList").get(verifyJWT, allPostList)
router.route("/editView/:id").get(verifyJWT, editView);
router.route("/post/edit/:id").put( upload.fields([{name: "featuredImage", maxCount: 1}]), verifyJWT, editPost);
router.route("/delete/:id").delete(verifyJWT, deletePost);
router.route("/draftpost").get(verifyJWT, draftPosts)
router.route("/popular-posts").get(popularPosts)
router.route("/trending-posts").get(trendingPosts)
router.route("/post/views/:id").get(views)




export default router;
