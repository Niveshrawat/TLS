// routes/shortTermCourseRoutes.js
import express from 'express';
import {
  createShortTermCourse,
  getShortTermCourses,
  getShortTermCourseById,
  updateShortTermCourse,
  deleteShortTermCourse
} from '../controllers/shortTermCourseController.js';
import { isAdmin, requireSignIn } from '../middlewares/adminauthMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/create-short-term-course', requireSignIn, isAdmin, upload.single('image'), createShortTermCourse);
// router.post('/create-short-term-course', requireSignIn, isAdmin, upload.array('images', 10), createShortTermCourse);

// Route to get all short-term courses
router.get('/short-term-courses', getShortTermCourses);

// Route to get a single short-term course by ID
router.get('/short-term-courses/:id', getShortTermCourseById);

// Route to update a short-term course by ID
router.put('/short-term-courses/:id', requireSignIn, isAdmin, upload.single('image'), updateShortTermCourse);
// router.put('/short-term-courses/:id', requireSignIn, isAdmin, upload.array('images', 10), updateShortTermCourse);

// Route to delete a short-term course by ID
router.delete('/short-term-courses/:id', requireSignIn, isAdmin, deleteShortTermCourse);

export default router;