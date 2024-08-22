import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      
    },
    email: {
      type: String,
     
    },
    message: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
