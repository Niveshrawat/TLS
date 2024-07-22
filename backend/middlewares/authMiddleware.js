import Jwt  from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const decode = Jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const isAdmin = async(req,res,next) =>{
    try{
        const user= await userModel.findById(req.user._id)
        console.log(user);
        if(user.role!==1){
            res.status(401).send({
                success:false,
                message:"UnAuthorize Access"
            })
        }else{
            next();
        }
        

    }catch(error){
        console.log(error)
        res.status(400).send({
            success:false,
            error,
            message:'error in middleware'
        })

    }
}