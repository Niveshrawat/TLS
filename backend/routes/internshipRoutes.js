import express from 'express';
import { submitInternshipForm, getInternships } from '../controllers/internshipController.js';

const router = express.Router();

// Route to handle form submission
router.post('/submit-internship', submitInternshipForm);

// Route to get all internships
router.get('/internships', getInternships);

export default router;
