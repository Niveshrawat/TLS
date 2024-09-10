import express from 'express';
import {
  createCollege,
  getColleges,
  getCollegeById,
  updateCollege,
  deleteCollege
} from '../controllers/collegeInfoController.js';
import {
  createCourseAndFee,
  getCoursesAndFees,
  getCourseAndFeeById,
  updateCourseAndFee,
  deleteCourseAndFee
} from '../controllers/coursesAndFeeController.js';
import {
  createAdmission,
  getAdmissions,
  getAdmissionById,
  updateAdmission,
  deleteAdmission
} from '../controllers/admissionController.js';
import {
  createPlacement,
  getPlacements,
  getPlacementById,
  updatePlacement,
  deletePlacement
} from '../controllers/placementController.js';
import {
  createRankingHighlight,
  getRankingHighlights,
  getRankingHighlightById,
  updateRankingHighlight,
  deleteRankingHighlight
} from '../controllers/rankingHighlightsController.js';


import { isAdmin, requireSignIn } from '../middlewares/adminauthMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// CollegeInfo routes
// router.post('/create-colleges', upload.array('photos', 10), createCollege);
router.post('/create-colleges',requireSignIn,isAdmin  , upload.array('photos', 10), createCollege);
router.get('/colleges', getColleges);
router.get('/colleges/:id', getCollegeById);
router.put('/colleges/:id', requireSignIn, isAdmin, upload.array('photos', 10), updateCollege);
router.delete('/colleges/:id', requireSignIn, isAdmin, deleteCollege);

// CoursesAndFee routes
// router.post('/create-coursesAndFees',  createCourseAndFee);
router.post('/create-coursesAndFees', requireSignIn,isAdmin , createCourseAndFee);
router.get('/coursesAndFees/:collegeId', getCoursesAndFees);
router.get('/courseAndFee/:id', getCourseAndFeeById);
router.put('/courseAndFee/:id', requireSignIn,isAdmin , updateCourseAndFee);
router.delete('/courseAndFee/:id', requireSignIn,isAdmin , deleteCourseAndFee);

// Admission routes
// router.post('/create-admissions',  createAdmission);
router.post('/create-admissions', requireSignIn,isAdmin , createAdmission);
router.get('/admissions/:collegeId', getAdmissions);
router.get('/admission/:id', getAdmissionById);
router.put('/admission/:id', requireSignIn,isAdmin , updateAdmission);
router.delete('/admission/:id', requireSignIn,isAdmin , deleteAdmission);

// Placement routes
// router.post('/create-placements',  createPlacement);
router.post('/create-placements', requireSignIn,isAdmin , createPlacement);
router.get('/placements/:collegeId', getPlacements);
router.get('/placement/:id', getPlacementById);
router.put('/placement/:id', requireSignIn,isAdmin , updatePlacement);
router.delete('/placement/:id', requireSignIn,isAdmin , deletePlacement);

// RankingHighlights routes
// router.post('/create-rankingHighlights', createRankingHighlight);
router.post('/create-rankingHighlights',requireSignIn,isAdmin , createRankingHighlight);
router.get('/rankingHighlights/:collegeId', getRankingHighlights);
router.get('/rankingHighlight/:id', getRankingHighlightById);
router.put('/rankingHighlight/:id', requireSignIn,isAdmin , updateRankingHighlight);
router.delete('/rankingHighlight/:id', requireSignIn,isAdmin , deleteRankingHighlight);

export default router;
