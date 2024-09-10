import express from "express";
import { 
  submitForm, 
  undergraduates, 
  assignLeadToCaller, 
  updateLeadStatus, 
  getLeadsForCaller, 
  getAllCallers, 
  getUserAppliedColleges
} from "../controllers/ugControllers.js";

import { isCaller, isCallerOrTeamLeader, isTeamLeader, isTeamLeaderOrAdmin, requireSignIn } from "../middlewares/adminauthMiddleware.js";

const router = express.Router();

router.post("/submit-form", requireSignIn, submitForm);
router.get('/undergraduates', requireSignIn, isTeamLeaderOrAdmin, undergraduates);
router.put('/assign-lead/:leadId', requireSignIn, isTeamLeader, assignLeadToCaller);
router.put('/update-lead-status/:leadId', requireSignIn, isCallerOrTeamLeader, updateLeadStatus);
router.get('/caller-leads', requireSignIn, isCaller, getLeadsForCaller);
router.get('/callers', requireSignIn, isTeamLeader, getAllCallers);
router.get('/user-applied-colleges', requireSignIn, getUserAppliedColleges);

export default router;
