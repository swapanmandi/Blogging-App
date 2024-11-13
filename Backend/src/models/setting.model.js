import mongoose from "mongoose";
 

const settingSchema  = new mongoose.Schema({
    siteTitle:{
        type: String,
        
    },
    tagLine:{
        type: String,
        
    },
    siteIcon:{
        type: String,

    },
    dateFormat:{
        type: String,
        
    },
    timeFormat:{
        type: String,
        
    },
    maxShowPost:{
        type: String,
       
    },
    featuredImageWidth:{
        type: Number,
    },
    featuredImageHeight:{
        type: Number,
       
    },
    permalinkType:{
        type: String,
        enum: ["title", "id"],
        default: "title",
       
    },
    showAdminOnList:{
        type: Boolean,
        default: false
    },
    showAdminOnPost:{
        type:Boolean,
        default: false
    },
    showDateOnList:{
        type:Boolean,
        default: true
    },
    showDateOnPost:{
        type:Boolean,
        default: true
    },
    showTimeOnList:{
        type:Boolean,
        default: false
    },
    showTimeOnPost:{
        type:Boolean,
        default: false
    },
    showTagOnPost:{
        type:Boolean,
        default: false
    },
    showCategoryOnPost:{
        type:Boolean,
        default: true
    }
    
}, {timestamps: true})

export const Setting = mongoose.model("Setting", settingSchema)