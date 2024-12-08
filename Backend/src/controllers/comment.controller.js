import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addComment = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;
  const { content } = req.body;
  if (!content.trim()) {
    throw new ApiError(400, "Field is empty");
  }
 
  if (req.user?.role !== "user") {
    throw new ApiError(400, "You have not logged in!");
  }

  const comment = new Comment({
    content: content,
    commentedBy: req.user._id,
    post: postId,
  });
  await comment.save();

  return res
    .status(200)
    .json(new ApiResponse(200, { comment }, "Comment Added Successfully"));
});

const getComments = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;

  const comments = await Comment.find({ post: postId }).populate(
    "commentedBy",
    "fullName"
  );
  const count = await Comment.countDocuments({ post: postId });
  //console.log("count", count)
  if (!comments) {
    throw new ApiError(400, "There is no post");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { comments, totalComments: count },
        "comments fetched successfully"
      )
    );
});


const getCommentDashboardData = asyncHandler(async (req, res) => {
  try {
    const commentsCount = await Comment.countDocuments();
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          commentsCount,
          "comment dashboard count fetched successfully."
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      "error to fetch comments count or internal error",
      error
    );
  }
});

export { addComment, getComments, getCommentDashboardData };
