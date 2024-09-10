import express from 'express';
import {
  createVocationalEducation,
  getVocationalEducation,
  getVocationalEducationById,
  updateVocationalEducation,
  deleteVocationalEducation
} from '../controllers/vocationalEducationController.js';
import { requireSignIn, isAdmin } from '../middlewares/adminauthMiddleware.js';

const router = express.Router();

// Route to create a new vocational education program with photo upload
router.post('/create-vocational-education', requireSignIn, isAdmin, createVocationalEducation);

// Route to get all vocational education programs
router.get('/vocational-education', getVocationalEducation);

// Route to get a single vocational education program by id
router.get('/vocational-education/:id', getVocationalEducationById);

// Route to update a vocational education program with photo upload
router.put('/vocational-education/:id', requireSignIn, isAdmin, updateVocationalEducation);

// Route to delete a vocational education program
router.delete('/vocational-education/:id', requireSignIn, isAdmin, deleteVocationalEducation);

export default router;
