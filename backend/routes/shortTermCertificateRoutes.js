import express from 'express';
import { submitShortTermCertificateForm, getShortTermCertificates } from '../controllers/shortTermCertificateController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to handle form submission
router.post('/submit-short-term-certificate',requireSignIn,submitShortTermCertificateForm);

// Route to get all short-term certificates
router.get('/short-term-certificates', getShortTermCertificates);
// router.get('/short-term-certificates',requireSignIn,isAdmin, getShortTermCertificates);

export default router;
