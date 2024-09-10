import express from 'express';
import {
  applyForJob,
  getApplicationsByUser,
  getApplicationsByPoster,
  updateApplicationStatus
} from '../controllers/jobApplicationController.js';
import { requireSignIn, isJobPoster } from '../middlewares/adminauthMiddleware.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// Apply for a job with video upload
// router.post('/apply', requireSignIn, upload.single('video'), applyForJob);
router.post('/apply', requireSignIn, upload.fields([{ name: 'video' }, { name: 'resume' }]), applyForJob);

// Get applications by user
router.get('/my-applications', requireSignIn, getApplicationsByUser);

// Get applications for job postings by poster
router.get('/poster-applications', requireSignIn, isJobPoster, getApplicationsByPoster);

// Update application status by poster
router.put('/update-status', requireSignIn, isJobPoster, updateApplicationStatus);

export default router;
