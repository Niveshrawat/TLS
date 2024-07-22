import express from 'express';
import { submitLongTermCertificateForm, getLongTermCertificates } from '../controllers/longTermCertificateController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to handle form submission
router.post('/submit-long-term-certificate',requireSignIn, submitLongTermCertificateForm);
// router.post('/submit-long-term-certificate',rqequireSignIn, submitLongTermCertificateForm);

// Route to get all long-term certificates
router.get('/long-term-certificates', getLongTermCertificates);
// router.get('/long-term-certificates',requireSignIn,isAdmin, getLongTermCertificates);

export default router;
