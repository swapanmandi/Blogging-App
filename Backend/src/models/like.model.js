import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      
    },
    comment:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    },
    
    likedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
     
    },
  },
  {
    timestamps: true,
  }
);

export const Like = mongoose.model("Like", likeSchema);
