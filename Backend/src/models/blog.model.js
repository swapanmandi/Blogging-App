import mongoose from "mongoose";


const blogSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    description:{
        type:String
       
    },
    content:{
        type: String,
        required: true
    },
    featuredImage:{
        type: String
    },
    category:{
        type:String
    },
    status:{
        type: String,
        enum:['active', 'inactive']
    }
},{timestamps:true})

export const Blog = mongoose.model("Blog", blogSchema)