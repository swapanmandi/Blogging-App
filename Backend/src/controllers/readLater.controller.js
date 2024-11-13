import { ReadLater } from "../models/readLater.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const readLaterPosts = asyncHandler(async (req, res) => {
  try {
    const { id: postId } = req.params;

    const existedSavedPosts = await ReadLater.findOne({
      user: req.user._id,
      post: postId,
    });

    if (req.user?.role !== "user") {
      throw new ApiError(400, "You have not logged in");
    }

    if (existedSavedPosts) {
      await ReadLater.findOneAndDelete(existedSavedPosts._id);
      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { status: false },
            "saved post removed successfully."
          )
        );
    } else {
      const posts = new ReadLater({ user: req.user._id, post: postId });
      await posts.save();
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { status: true },
            "post saved for later successfully."
          )
        );
    }
  } catch (error) {
    throw new ApiError(400, "errot to save post for later");
  }
});

//get saved posts

const getReadLaterPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await ReadLater.find({ user: req.user._id }).populate("post");

    res
      .status(200)
      .json(
        new ApiResponse(200, posts, "fetched read later posts successfully.")
      );
  } catch (error) {
    throw new ApiError(400, "errot to fetch saved posts for later");
  }
});

// get status

const getSavedStatus = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;

  const status = await ReadLater.findOne({ user: req.user._id, post: postId });

  res
    .status(200)
    .json(
      new ApiResponse(200, { status: !!status }, "status fetched successfully.")
    );
});

export { readLaterPosts, getReadLaterPosts, getSavedStatus };
