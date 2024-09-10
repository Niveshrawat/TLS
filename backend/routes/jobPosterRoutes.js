// routes/jobPosterRoutes.js
import express from 'express';
import { changePassword, getAllJobPosters, getPendingJobPosters, login, submitJobPosterForm } from '../controllers/jobPosterController.js';

import { approveJobPoster } from '../controllers/adminauthController.js';
import { isAdmin, requireSignIn } from '../middlewares/adminauthMiddleware.js';


const router = express.Router();

// Job Poster registration
router.post('/register-job-poster', submitJobPosterForm);

// Admin approves job poster
router.put('/approve-job-poster/:posterId',requireSignIn,isAdmin, approveJobPoster);


router.post('/login', login);

router.get('/pending-job-posters',requireSignIn,isAdmin,getPendingJobPosters);

// Job Poster changes password
router.put('/change-password',requireSignIn, changePassword);

// Get all job posters
router.get('/all-job-posters', requireSignIn, isAdmin, getAllJobPosters); 


export default router;
