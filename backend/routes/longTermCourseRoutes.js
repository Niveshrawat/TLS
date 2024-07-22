// routes/longTermCourseRoutes.js
import express from 'express';
import {
  createLongTermCourse,
  getLongTermCourses,
  getLongTermCourseById,
  updateLongTermCourse,
  deleteLongTermCourse
} from '../controllers/longTermCourseController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Route to create a new long-term course 
router.post('/create-long-term-course',  upload.array('images', 10), createLongTermCourse);
// router.post('/create-long-term-course', requireSignIn, isAdmin, upload.array('images', 10), createLongTermCourse);

// Route to get all long-term courses
router.get('/long-term-courses', getLongTermCourses);

// Route to get a single long-term course by ID
router.get('/long-term-courses/:id', getLongTermCourseById);

// Route to update a long-term course by ID
router.put('/long-term-courses/:id', requireSignIn, isAdmin, upload.array('images', 10), updateLongTermCourse);

// Route to delete a long-term course by ID
router.delete('/long-term-courses/:id', requireSignIn, isAdmin, deleteLongTermCourse);

export default router;