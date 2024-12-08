import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Blog } from "../models/blog.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import redis from "../utils/redis.js";

// ad create post

const createBlog = asyncHandler(async (req, res) => {
  const admin = req.user?.role;
  if (admin !== "admin") {
    throw new ApiError(401, "You are not a admin.");
  }
  const { title, slug, description, content, category, tags, status } =
    req.body;

  //console.log("data", req.body);

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

// ad published post list

const allPostList = asyncHandler(async (req, res) => {
  let posts = await redis.get("admin_posts");

  if (posts) {
    posts = JSON.parse(posts);
  } else {
    posts = await Blog.find({ user: req.user._id, status: "active" }).select(
      " -status -slug "
    );

    if (!posts) {
      throw new ApiError(400, "Error to find and edit blog");
    }

    await redis.set("admin_posts", JSON.stringify(posts), "EX", 3600);
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, posts, "Published posts list fetched successfully.")
    );
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
  const admin = req.user?.role;
  if (admin !== "admin") {
    throw new ApiError(401, "You are not a admin.");
  }
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
  const admin = req.user?.role;
  if (admin !== "admin") {
    throw new ApiError(401, "You are not a admin.");
  }

  const { id: id } = req.params;
  const result = await Blog.deleteOne({ _id: id });

  if (result.deletedCount === 0) {
    throw new ApiError(404, "Thre is no post or error to delete");
  }

  res.status(200).json(new ApiResponse(200, {}, "Post delete sucessfully."));
});

//pub fetch all blog

const getBlogList = asyncHandler(async (req, res) => {
  try {
    try {
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
      }
    } catch (error) {
      throw new ApiError(400, "Redis error:", error);
    }

    const posts = await Blog.find({
      status: "active",
    }).select(" -status");

    //console.log(posts)

    if (!posts || posts.length === 0) {
      throw new ApiError(500, "There is no Blogs or Error to fetch blogs.");
    }

    try {
      await redis.set("pub_posts", JSON.stringify(posts), "EX", 3600);
    } catch (error) {
      throw new ApiError(400, "Failed to cache blogs in Redis:", error);
    }

    return res
      .status(200)
      .json(new ApiResponse(200, posts, "Post list fetched successfully."));
  } catch (error) {
    throw new ApiError(500, "An error occurred while fetching blog posts.");
  }
});

// popular posts

const popularPosts = asyncHandler(async (req, res) => {
  try {
    const trendPosts = await Blog.aggregate([
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
        new ApiResponse(200, trendPosts, "Popular posts fetched successfully.")
      );
  } catch (error) {
    throw new ApiError(400, "Error to indentify popular posts.");
  }
});

//trend posts

const trendingPosts = asyncHandler(async (req, res) => {
  const currentDate = new Date();
  let trendPosts = await redis.get("trend_posts");

  if (trendPosts) {
    trendPosts = JSON.parse(trendPosts);
  } else {
    trendPosts = await Blog.aggregate([
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

    if (!trendPosts) {
      throw new ApiError(400, "Error to indentify trending posts.");
    }

    await redis.set("trend_posts", JSON.stringify(trendPosts), "EX", 3600);
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, trendPosts, "trending posts fetched successfully")
    );
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

const getBlogDashboardData = asyncHandler(async (req, res) => {
  try {
    const blogsCount = await Blog.countDocuments();
    const publishedBlogsCount = await Blog.countDocuments({ status: "active" });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { blogsCount, publishedBlogsCount },
          "blogs dashboard count fetched successfully."
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      "Error to get blogs dashboard data or internal error",
      error
    );
  }
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
  getBlogDashboardData
};
