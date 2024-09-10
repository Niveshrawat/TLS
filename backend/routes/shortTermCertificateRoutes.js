import express from 'express';
import { submitShortTermCertificateForm, getShortTermCertificates, assignLeadToCaller, updateLeadStatus, getLeadsForCaller, getUserAppliedCourses, getAllCallers } from '../controllers/shortTermCertificateController.js';

import { isAdmin, isCaller, isCallerOrTeamLeader, isTeamLeader, isTeamLeaderOrAdmin, requireSignIn } from '../middlewares/adminauthMiddleware.js';


const router = express.Router();

// Route to handle form submission
router.post('/submit-short-term-certificate',requireSignIn,submitShortTermCertificateForm);

// Route to get all short-term certificates
router.get('/short-term-certificates',requireSignIn,isTeamLeaderOrAdmin, getShortTermCertificates);

router.put('/assign-lead/:leadId',requireSignIn, isTeamLeader, assignLeadToCaller);

// Route to update the status of a lead (accessible to callers)
router.put('/update-lead-status/:leadId', requireSignIn,isCallerOrTeamLeader, updateLeadStatus);

// Route for caller to get assigned leads
router.get('/caller-leads', requireSignIn, isCaller, getLeadsForCaller);

// Route for users in which he applied
router.get('/user-applied-courses', requireSignIn, getUserAppliedCourses);

//Route to get all calers 
router.get('/callers', requireSignIn, isTeamLeader, getAllCallers);
export default router;
