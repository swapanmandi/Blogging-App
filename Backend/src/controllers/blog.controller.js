import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Blog } from "../models/blog.model.js";


const createBlog = asyncHandler(async (req, res) => {
  const { title, slug, description, content, featuredImage, category, status } =
    req.body;
  if ([title, slug, content].some((item) => item.trim() === "")) {
    throw new ApiError(400, "Field can not be empty.");
  }

  const blog = await Blog.create({
    user: req.user,
    title,
    slug,
    description,
    content,
    featuredImage,
    category,
    status,
  });

  const createdBlog = await Blog.findById(blog._id);

  if (!createBlog) {
    throw new ApiError(400, "error to save data");
  }

  res
    .status(200)
    .json(new ApiResponse(200, createdBlog, "data saved successfully."));
});

// fetch blog

const getBlog = asyncHandler(async (req, res) => {
  const { id: id } = req.params;
  const blog = await Blog.findOne({ _id: id });

  if (!blog) {
    throw new ApiError(404, "The blog is unavilable");
  }

  res.status(200).json(new ApiResponse(200, blog, "Blog fetched successfully"));
});

//edit blog

const editBlog = asyncHandler(async (req, res) => {
  const { id: id } = req.params;
  const { title, slug, description, content, featuredImage, category, status } =
    req.body;

  const blog = await Blog.findOneAndUpdate(
    { _id: id, user: req.user._id },
    { title, slug, description, content, featuredImage, category, status },
    { new: true }
  );
  if (!blog) {
    throw new ApiError(400, "Error to find and edit blog");
  }

  res.status(200).json(new ApiResponse(200, blog, "Blog edit successfully."));
});




export { createBlog, getBlog, editBlog };
