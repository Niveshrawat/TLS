// routes/jobPostingRoutes.js
import express from 'express';
import { createJobPosting, getAllJobPostings, getJobPostingsByPoster } from '../controllers/jobPostingController.js';
import { isJobPoster, requireSignIn } from '../middlewares/adminauthMiddleware.js';


const router = express.Router();

// Create a job posting
router.post('/create', requireSignIn, isJobPoster, createJobPosting);

// Get job postings by poster
router.get('/my-postings', requireSignIn, isJobPoster, getJobPostingsByPoster);

// Get all job postings
router.get('/all', getAllJobPostings);
export default router;
