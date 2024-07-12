import {createBlog, getBlog, editBlog} from '../controllers/blog.controller.js'
import { Router } from 'express'
import {verifyJWT} from '../middlewares/auth.middleware.js'

const router = Router()

router.route("/createBlog").post(verifyJWT, createBlog)
router.route("/:id").get(verifyJWT, getBlog)
router.route("/edit/:id").post(verifyJWT, editBlog)



export default router