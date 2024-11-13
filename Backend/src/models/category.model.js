import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    category:[{
        type: String,
        required: true,
        default: "General"
    }]
}, {timestamps: true})


export const Category = mongoose.model("Category", categorySchema)