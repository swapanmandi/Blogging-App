import {Message} from '../models/message.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'


const sendMessage =  asyncHandler(async(req, res) =>{
    const {fullName, email, message} = req.body
    if(!req.user?._id){
        //console.log("id", req.user?._id)
        if(!fullName || !email || !message){
            throw new ApiError(400, "All fields are required.")
        }
    }else{
        if(!message){
            throw new ApiError(400, "Field is required.")
        }
    }

  

    const createdMessage = new Message({fullName: req.user?._id || fullName, email: req.user?.email || email, message })

    await createdMessage.save()

    res.status(200).json(new ApiResponse(200, createdMessage, "message send successfully."))
})

export {sendMessage}