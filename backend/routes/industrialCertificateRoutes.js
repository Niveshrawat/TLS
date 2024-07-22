import express from 'express';
import { submitIndustrialCertificateForm, getIndustrialCertificates } from '../controllers/industrialCertificateController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to handle form submission
router.post('/submit-industrial-certificate',requireSignIn,submitIndustrialCertificateForm);

// Route to get all industrial certificates
router.get('/industrial-certificates', requireSignIn,isAdmin,getIndustrialCertificates);

export default router;
