import express from "express";

import {
  registerController,
  loginController,
  // verifyOtpController,
  forgotPasswordController,
    updateProfileController,
  getAllUsersController,
  updateUserRoleController,
  resetPasswordController,
  getProfileController,
  deleteUserController,
  deleteAllUsersController,
  getUserDetailsController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/adminauthMiddleware.js";
import passport from 'passport';
import JWT from 'jsonwebtoken';


//router object
const router = express.Router();

router.post("/register", registerController);


router.post("/login",loginController );


router.get("/admin", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password/:token', resetPasswordController);
router.put("/profile", requireSignIn, updateProfileController);
// fetching user profile
router.get("/profile", requireSignIn, getProfileController);
// router.get("/users",  getAllUsersController);
router.get("/users", requireSignIn,isAdmin, getAllUsersController);
router.put("/user-role", requireSignIn, isAdmin, updateUserRoleController);
 
// //protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// Google authentication routes

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: 'https://thelearnskills.com/login' }), 
  (req, res) => {
    // Successful authentication, generate a JWT token
    const token = JWT.sign({ _id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Redirect to the frontend with the token
    res.redirect(`http://localhost:5173/auth?token=${token}`);
  }
);

// Fetch user profile using token
router.get('/me', requireSignIn, async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Delete a single user route
router.delete("/user/:id", requireSignIn, isAdmin, deleteUserController);

// Delete all users route
router.delete("/users", requireSignIn, isAdmin, deleteAllUsersController);


// Route to get a specific user's full details by ID (Admin only)
router.get("/user/:id", requireSignIn, isAdmin, getUserDetailsController);





export default router;