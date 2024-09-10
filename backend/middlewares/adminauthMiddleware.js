import Jwt from "jsonwebtoken";
// import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";
import JobPoster from '../models/JobPoster.js';

// export const requireSignIn = async(req,res,next) =>{
//   try{
//       const decode = Jwt.verify(req.headers.authorization,process.env.JWT_SECRET)
//       req.user=decode
//       next()
//   }catch(error){
//       console.log(error)
//   }
// }

export const requireSignIn = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        console.error("No authorization header provided");
        return res.status(401).json({ success: false, message: "No token provided" });
      }
  
      const token = authHeader.split(" ")[1];
      if (!token) {
        console.error("Invalid authorization header format");
        return res.status(401).json({ success: false, message: "Invalid token" });
      }
  
      const decode = Jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      next();
    } catch (error) {
      console.error("JWT Verification Error:", error.message);
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  };
  
  export const isAdmin = async (req, res, next) => {
    try {
      const user = await Admin.findById(req.user._id);
      if (!user) {
        console.error("User not found");
        return res.status(403).json({ success: false, message: "Unauthorized access" });
      }
      if (user.role !== "admin" && user.role !== 1) {
        console.error("User does not have admin privileges");
        return res.status(403).json({ success: false, message: "Unauthorized access" });
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


  export const isTeamLeaderOrAdmin = async (req, res, next) => {
    try {
      // Assuming req.user._id is set by a previous authentication middleware
      const user = await Admin.findById(req.user._id);
      if (!user) {
        return res.status(403).json({ success: false, message: "Unauthorized access: User not found" });
      }
  
      // Check if the user's role is either "teamLeader" or "admin"
      if (user.role !== "teamLeader" && user.role !== "admin") {
        return res.status(403).json({ success: false, message: "Unauthorized access: You do not have the required role" });
      }
  
      // If user is authorized, proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error("isTeamLeaderOrAdmin Middleware Error:", error.message);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  };

  export const isCallerOrTeamLeader = async (req, res, next) => {
    try {
      // Assuming req.user._id is set by a previous authentication middleware
      const user = await Admin.findById(req.user._id);
      if (!user) {
        return res.status(403).json({ success: false, message: "Unauthorized access: User not found" });
      }
  
      // Check if the user's role is either "caller" or "teamLeader"
      if (user.role !== "caller" && user.role !== "teamLeader") {
        return res.status(403).json({ success: false, message: "Unauthorized access: You do not have the required role" });
      }
  
      // If user is authorized, proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error("isCallerOrTeamLeader Middleware Error:", error.message);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  };

// job Poster middleware
export const isJobPoster = async (req, res, next) => {
  try {
    // console.log('Decoded User:', req.user); // Debug statement
    const jobPoster = await JobPoster.findById(req.user.id);
    // console.log('Job Poster:', jobPoster); // Debug statement

    if (!jobPoster || jobPoster.status !== 'approved') {
      return res.status(403).json({ message: 'Access denied. Not an approved job poster.' });
    }
    next();
  } catch (error) {
    console.error('isJobPoster Middleware Error:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
