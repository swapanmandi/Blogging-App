import mongoose, { mongo } from "mongoose";

const readLaterSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  },
  { timestamps: true }
);


export const ReadLater = mongoose.model("ReadLater", readLaterSchema)