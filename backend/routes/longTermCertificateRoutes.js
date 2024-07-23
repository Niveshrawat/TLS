import express from 'express';
import { 
  submitLongTermCertificateForm, 
  getLongTermCertificates, 
  assignLeadToCaller, 
  updateLeadStatus, 
  getLeadsForCaller 
} from '../controllers/longTermCertificateController.js';
import { isAdmin, isCaller, isTeamLeader, requireSignIn } from '../middlewares/adminauthMiddleware.js';

const router = express.Router();

// Route to handle form submission
router.post('/submit-long-term-certificate',requireSignIn, submitLongTermCertificateForm);

// Route to get all long-term certificates
router.get('/long-term-certificates', requireSignIn, isTeamLeader || isAdmin, getLongTermCertificates);

// Route to assign a lead to a caller
router.put('/assign-lead/:leadId', requireSignIn, isTeamLeader, assignLeadToCaller);

// Route to update the status of a lead (accessible to callers)
router.put('/update-lead-status/:leadId', requireSignIn, isCaller || isTeamLeader, updateLeadStatus);

// Route for caller to get assigned leads
router.get('/caller-leads', requireSignIn, isCaller, getLeadsForCaller);

export default router;
