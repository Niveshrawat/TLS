import express from "express";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { submitForm, undergraduates } from "../controllers/ugControllers.js";


//router object
const router = express.Router();

router.post("/submit-form",requireSignIn,submitForm);
// router.get('/undergraduates',requireSignIn,isAdmin,undergraduates);
router.get('/undergraduates',undergraduates);




export default router;