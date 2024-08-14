import mongoose, { mongo } from "mongoose";


const commentSchema = new mongoose.Schema({
post:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog"
},
commentedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
}
}, {timestamps: true})

export const Comment = mongoose.model("Comment", commentSchema)