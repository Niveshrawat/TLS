import express from 'express';
import { submitShortTermCertificateForm, getShortTermCertificates, assignLeadToCaller, updateLeadStatus, getLeadsForCaller, getUserAppliedCourses } from '../controllers/shortTermCertificateController.js';

import { isAdmin, isCaller, isTeamLeader, requireSignIn } from '../middlewares/adminauthMiddleware.js';


const router = express.Router();

// Route to handle form submission
router.post('/submit-short-term-certificate',requireSignIn,submitShortTermCertificateForm);

// Route to get all short-term certificates
router.get('/short-term-certificates',requireSignIn,isTeamLeader||isAdmin, getShortTermCertificates);

router.put('/assign-lead/:leadId',requireSignIn, isTeamLeader, assignLeadToCaller);

// Route to update the status of a lead (accessible to callers)
router.put('/update-lead-status/:leadId', requireSignIn,isCaller||isTeamLeader, updateLeadStatus);

// Route for caller to get assigned leads
router.get('/caller-leads', requireSignIn, isCaller, getLeadsForCaller);

router.get('/user-applied-courses', requireSignIn, getUserAppliedCourses);


export default router;
