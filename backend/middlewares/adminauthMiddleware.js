import Jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";

export const requireSignIn = async(req,res,next) =>{
    try{
        const decode = Jwt.verify(req.headers.authorization,process.env.JWT_SECRET)
        req.user=decode
        next()
    }catch(error){
        console.log(error)
    }
  }

export const isAdmin = async (req, res, next) => {
  try {
    const user = await Admin.findById(req.user._id);
    if (!user || user.role !== "admin" || user.role !==1) {
      return res.status(403).json({ success: false, message: "Unauthorizeds access" });
    }
    next();
  } catch (error) {
    console.error("isAdmin Middleware Error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const isTeamLeader = async (req, res, next) => {
  try {
    const user = await Admin.findById(req.user._id);
    if (!user || user.role !== "teamLeader") {
      return res.status(403).json({ success: false, message: "Unauthorizeds access you are not team leader" });
    }
    next();
  } catch (error) {
    console.error("isTeamLeader Middleware Error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const isCaller = async (req, res, next) => {
    try {
      const user = await Admin.findById(req.user._id);
      if (!user || user.role !== "caller") {
        return res.status(403).json({ success: false, message: "Unauthorized access you are not caller" });
      }
      next();
    } catch (error) {
      console.error("isTeamLeader Middleware Error:", error.message);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  };