import mongoose, { mongo } from "mongoose";


const shareSchema = new mongoose.Schema({
post:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog"
},
sharedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
}
}, {timestamps: true})

export const Share = mongoose.model("Share", shareSchema)