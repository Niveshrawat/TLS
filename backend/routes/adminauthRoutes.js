import express from 'express';
import { getAllTeamLeaders, getAllTlandCallerController, login, register } from '../controllers/adminauthController.js';
import { isAdmin, requireSignIn } from '../middlewares/adminauthMiddleware.js';




const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);
// Get All users(TL and callers) register by the user 
router.get('/users',requireSignIn,isAdmin,getAllTlandCallerController)

//Route to get all teamLeaders 
router.get('/teamLeaders', requireSignIn, isAdmin, getAllTeamLeaders);


export default router;
