import express from "express";
import { 
  submitVcForm, 
  getAllVcForms, 
  assignVcLeadToCaller, 
  updateVcLeadStatus, 
  getVcLeadsForCaller, 
  getAllVcCallers, 
  getUserAppliedVocationalCourses 
} from "../controllers/vcFormController.js";

import { isCaller, isCallerOrTeamLeader, isTeamLeader, isTeamLeaderOrAdmin, requireSignIn } from "../middlewares/adminauthMiddleware.js";

const router = express.Router();

router.post("/submit-vc-form", requireSignIn, submitVcForm);
router.get('/vc-forms', requireSignIn, isTeamLeaderOrAdmin, getAllVcForms);
router.put('/assign-vc-lead/:leadId', requireSignIn, isTeamLeader, assignVcLeadToCaller);
router.put('/update-vc-lead-status/:leadId', requireSignIn, isCallerOrTeamLeader, updateVcLeadStatus);
router.get('/caller-vc-leads', requireSignIn, isCaller, getVcLeadsForCaller);
router.get('/vc-callers', requireSignIn, isTeamLeader, getAllVcCallers);
router.get('/user-applied-vocational-courses', requireSignIn, getUserAppliedVocationalCourses);

export default router;
