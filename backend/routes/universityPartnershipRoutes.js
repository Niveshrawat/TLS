import express from 'express';
import { submitUniversityPartnershipForm, getUniversityPartnerships } from '../controllers/universityPartnershipController.js';
import { isAdmin, requireSignIn } from '../middlewares/adminauthMiddleware.js';

const router = express.Router();

// Route to handle form submission
router.post('/submit-university-partnership',requireSignIn, submitUniversityPartnershipForm);

// Route to get all university partnerships
// router.get('/university-partnerships', getUniversityPartnerships);
router.get('/university-partnerships',requireSignIn,isAdmin, getUniversityPartnerships);

export default router;
