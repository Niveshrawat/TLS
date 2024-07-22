import express from "express";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { submitForm, postgraduates } from "../controllers/pgControllers.js";


//router object
const router = express.Router();

router.post("/submit-form",requireSignIn,submitForm);
router.get('/postgraduates',requireSignIn,isAdmin,postgraduates);




export default router;