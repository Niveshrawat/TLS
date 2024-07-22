import express from 'express';
import { submitJobSupportProgramForm, getJobSupportPrograms } from '../controllers/jobSupportProgramController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to handle form submission
router.post('/submit-job-support-program',requireSignIn, submitJobSupportProgramForm);

// Route to get all Job Support Programs
router.get('/job-support-programs',requireSignIn,isAdmin, getJobSupportPrograms);

export default router;
