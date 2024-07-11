import jwt from 'jsonwebtoken'
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/user.model.js'


const verifyJWT = async(req,_,next) =>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.relace("Bearer", "")
    
    if(!token){
        throw new ApiError(404, "AccessToken Finding Error")
    }
    
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
    const user = await User.findById(decodedToken._id).select("-password -refreshToken")
    if(!user){
        throw new ApiError(404, "Invalid AccessToken user did not found.")
    }
    
    req.user = user
    next()
    } catch (error) {
        throw new ApiError(400, "Invalid Access Token" || error?.message)
    }

}

export {verifyJWT}