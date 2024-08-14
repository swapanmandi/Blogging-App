import { Link } from "react-router-dom";
import { Blog } from "../models/blog.model.js";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { LineIcon } from "react-share";

const togglePostLike = asyncHandler(async (req, res) => {
  try {
    const { id: postId } = req.params;
    const post = await Blog.findById(postId);
    if (!post) {
      throw new ApiError(404, "there is no post");
    }

    const existedLike = await Like.findOne({
      likedBy: req.user._id,
      post: postId,
    });

    if (existedLike) {
      await Like.deleteOne({ likedBy: req.user._id, post: postId });
    } else {
      const like = new Like({ likedBy: req.user._id, post: postId });
      await like.save();
    }

    res.status(200).json(new ApiResponse(200, {}, "Liked successfully"));
  } catch (error) {
    throw new ApiError(400, "Error to Like post");
  }
});

//getLikes

const getLiked = asyncHandler(async (req, res) => {
  try {
    const { id: postId } = req.params;
    const likedPost = await Like.findOne({
      likedBy: req.user._id,
      post: postId,
    });

    const count = await Like.countDocuments({post:postId})

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { status: !!likedPost, noOfLikes: count },
          "Successfully fetched liked status"
        )
      );
  } catch (error) {
    throw new ApiError(400, "error to like post");
  }
});

export { togglePostLike, getLiked };
