import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Blog } from "../models/blog.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import redis from "../utils/redis.js";
import { Await } from "react-router-dom";

// ad create post

const createBlog = asyncHandler(async (req, res) => {
  const { title, slug, description, content, category, tags, status } =
    req.body;

  console.log("data", req.body);

  if ([title, slug, content].some((item) => item.trim() === "")) {
    throw new ApiError(400, "Field can not be empty.");
  }

  //upload Fimage
  let featuredImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.featuredImage) &&
    req.files.featuredImage.length > 0
  ) {
    featuredImageLocalPath = req.files?.featuredImage[0]?.path;
  }

  const uploadFeaturedImage = await uploadOnCloudinary(featuredImageLocalPath);

  let publishedDate;
  if (status === "active") {
    publishedDate = new Date();
  }

  const blog = await Blog.create({
    user: req.user,
    title,
    slug,
    description,
    content,
    featuredImage: uploadFeaturedImage?.url || "",
    category,
    tags,
    status,
    publishedAt: publishedDate || "",
  });

  const createdBlog = await Blog.findById(blog._id);

  if (!createBlog) {
    throw new ApiError(400, "error to save data");
  }

  res
    .status(200)
    .json(new ApiResponse(200, createdBlog, "data saved successfully."));
});

// ad list published post

const allPostList = asyncHandler(async (req, res) => {
  const blog = await Blog.find({ user: req.user._id, status: "active" });
  if (!blog) {
    throw new ApiError(400, "Error to find and edit blog");
  }

  res
    .status(200)
    .json(new ApiResponse(200, blog, "Blog edit list fetched successfully."));
});

//ad draft post

const draftPosts = asyncHandler(async (req, res) => {
  const draftPost = await Blog.find({ user: req.user._id, status: "inactive" });
  if (!draftPost) {
    throw new ApiError(404, "there is no draft Posts");
  }

  res
    .status(200)
    .json(new ApiResponse(200, draftPost, "draft posts fetched successfully"));
});

// ad view post

const editView = asyncHandler(async (req, res) => {
  const { id: id } = req.params;

  const blog = await Blog.findOne({ _id: id });
  if (!blog) {
    throw new ApiError(400, "Error to find and edit blog");
  }

  res
    .status(200)
    .json(new ApiResponse(200, blog, "Blog edit list fetched successfully."));
});

//ad edit blog

const editPost = asyncHandler(async (req, res) => {
  const { id: id } = req.params;
  const { title, slug, description, content, category, status } = req.body;
  console.log("edit data", req.body);

  let featuredImageLocalPath;

  if (
    req.files &&
    Array.isArray(req.files.featuredImage) &&
    req.files.featuredImage.length > 0
  ) {
    featuredImageLocalPath = req.files.featuredImage[0]?.path;
  }

  const uploadFeaturedImage = await uploadOnCloudinary(featuredImageLocalPath);

  const blog = await Blog.findOneAndUpdate(
    { _id: id, user: req.user._id },
    {
      title,
      slug,
      description,
      content,
      category,
      featuredImage: uploadFeaturedImage?.url || "",
      status,
    },
    { new: true }
  );
  if (!blog) {
    throw new ApiError(400, "Error to find and edit blog");
  }

  res.status(200).json(new ApiResponse(200, blog, "Blog edit successfully."));
});

// ad delete post

const deletePost = asyncHandler(async (req, res) => {
  const { id: id } = req.params;
  const result = await Blog.deleteOne({ _id: id });

  if (result.deletedCount === 0) {
    throw new ApiError(404, "Thre is no post or error to delete");
  }

  res.status(200).json(new ApiResponse(200, {}, "Post delete sucessfully."));
});

//pub fetch all blog

// const getBlogList = asyncHandler(async (req, res) => {
//   const blogs = await Blog.find({ status: "active" }).select(" -slug -status ");

//   if (!blogs) {
//     throw new ApiError(404, "There is no blogs or something went wrong.");
//   }

//   res
//     .status(200)

//     .json(new ApiResponse(200, blogs, "Blog list fetched succesfully"));
// });

const getBlogList = asyncHandler(async (req, res) => {
  const cachedPosts = await redis.get("pub_posts");

 
  if (cachedPosts) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          JSON.parse(cachedPosts),
          "Cached post list fetched successfully."
        )
      );
  } else {
    const posts = await Blog.find({
      status: "active",
    }).select(" -status -slug");

    //console.log(posts)

    if (!posts) {
      throw new ApiError(500, "There is no Blogs or Error to fetch blogs.");
    }

    await redis.set("pub_posts", JSON.stringify(posts), "EX", 3600);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          JSON.parse(posts),
          "Post list fetched successfully."
        )
      );
  }
});

const popularPosts = asyncHandler(async (req, res) => {
  try {
    const topPosts = await Blog.aggregate([
      {
        $addFields: {
          popularty: {
            $add: ["$likes", "$views"],
          },
        },
      },
      {
        $sort: {
          popularty: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    res
      .status(200)
      .json(
        new ApiResponse(200, topPosts, "Popular posts fetched successfully.")
      );
  } catch (error) {
    throw new ApiError(400, "Error to indentify popular posts.");
  }
});

const trendingPosts = asyncHandler(async (req, res) => {
  try {
    const currentDate = new Date();
    const topPosts = await Blog.aggregate([
      {
        $addFields: {
          trendingScore: {
            $add: [
              { $multiply: ["$likes", 0.5] },
              { $multiply: ["$views", 0.3] },
              // {
              //   $multiply: [{ $subtract: [currentDate, "$publishedAt"] }, -0.1],
              // },
            ],
          },
        },
      },
      {
        $sort: { trendingScore: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    res
      .status(200)
      .json(
        new ApiResponse(200, topPosts, "trending posts fetched successfully")
      );
  } catch (error) {
    throw new ApiError(400, "Error to indentify trending posts.");
  }
});

// counting views

const views = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;
  const post = await Blog.findById(postId);

  if (post) {
    post.views += 1;
    await post.save();
  } else {
    throw new ApiError(400, "post is not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, { views: post.views }, "Still counting the views")
    );
});

export {
  createBlog,
  //getBlog,
  editView,
  getBlogList,
  allPostList,
  editPost,
  deletePost,
  draftPosts,
  popularPosts,
  trendingPosts,
  views,
};
