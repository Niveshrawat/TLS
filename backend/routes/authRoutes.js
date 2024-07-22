import express from "express";

import {
  registerController,
  loginController,
  // verifyOtpController,
  forgotPasswordController,
    updateProfileController,
  getAllUsersController,
  updateUserRoleController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


//router object
const router = express.Router();

router.post("/register", registerController);


router.post("/login",loginController );


router.get("/admin", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
 router.post("/forgot-password", forgotPasswordController);
router.put("/profile", requireSignIn, updateProfileController);
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



export default router;