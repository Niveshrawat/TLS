import express from 'express';
import { submitCorporateCertificateForm, getCorporateCertificates } from '../controllers/corporateCertificateController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to handle form submission
router.post('/submit-corporate-certificate',requireSignIn, submitCorporateCertificateForm);

// Route to get all corporate certificates
router.get('/corporate-certificates',requireSignIn,isAdmin, getCorporateCertificates);

export default router;
