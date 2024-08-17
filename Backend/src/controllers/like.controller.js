import { Link } from "react-router-dom";
import { Blog } from "../models/blog.model.js";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const togglePostLike = asyncHandler(async (req, res) => {
  try {
    const { id: postId } = req.params;

    const existedLike = await Like.findOne({
      likedBy: req.user._id,
      post: postId,
    });

    if (existedLike) {
      await Like.deleteOne({ _id: existedLike._id });
      await Blog.findByIdAndUpdate(
        postId,
        {
          $inc: {
            likes: -1,
          },
        },
        {
          new: true,
        }
      );

      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { status: false },
            "Successfully disliked the post"
          )
        );
    } else {
      const like = new Like({ likedBy: req.user._id, post: postId });
      await like.save();
      await Blog.findByIdAndUpdate(
        postId,
        { $inc: { likes: 1 } },
        { new: true }
      );
      res
        .status(200)
        .json(
          new ApiResponse(200, { status: true }, "Successfully liked the post")
        );
    }

    res.status(200).json(new ApiResponse(200, {}, "Liked successfully"));
  } catch (error) {
    throw new ApiError(400, "Error to Like or dislike the post");
  }
});

//getLikes

const getLiked = asyncHandler(async (req, res) => {
  try {
    const { id: postId } = req.params;
    const post = await Blog.findById(postId);
    const likedPost = await Like.findOne({
      likedBy: req.user._id,
      post: postId,
    });

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { status: !!likedPost, noOfLikes: post.likes },
          "Successfully fetched liked status"
        )
      );
  } catch (error) {
    throw new ApiError(400, "error to like post");
  }
});

export { togglePostLike, getLiked };
