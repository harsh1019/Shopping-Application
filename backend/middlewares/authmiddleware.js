import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

// Protected route
export const requireSignIn = async (req,res,next) => {
    
    try{
        const decode = jwt.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user = decode;
        next();
    }catch(err){
        console.log(err);
    }
}


// admin access
export const isadmin = async (req,res,next) => {
   try{
    const user = await User.findById(req.user._id);
    if(user.role !== 1){
        return res.status(401).send({
            success:false,
            message:"UnAuthorized Access"
        });

    }else{
        next();
    }

   } catch(err){
    console.log(err);
    res.status(401).send({
        success:false,
        err,
        message:"error in admin middleware"
    })
   }   
}