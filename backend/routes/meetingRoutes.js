import express from 'express';
import {
  createMeetingController,
  getAllMeetingsController,
  getMeetingByIdController,
  updateMeetingController,
  deleteMeetingController,
  deleteAllMeetingsController,
} from '../controllers/meetingController.js';
import { isAdmin, requireSignIn } from '../middlewares/adminauthMiddleware.js';

const router = express.Router();

// Create a new meeting
router.post('/create', requireSignIn, isAdmin, createMeetingController);

// Get all meetings
router.get('/', requireSignIn, getAllMeetingsController);

// Get a single meeting by ID
router.get('/:id', requireSignIn, getMeetingByIdController);

// Update a meeting by ID
router.put('/:id', requireSignIn, isAdmin, updateMeetingController);

// Delete a meeting by ID
router.delete('/:id', requireSignIn, isAdmin, deleteMeetingController);

// Delete all meetings
router.delete('/', requireSignIn, isAdmin, deleteAllMeetingsController);

export default router;
