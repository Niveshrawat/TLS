// controllers/shortTermCourseController.js
import ShortTermCourse from "../models/shortTermCourse.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

export const createShortTermCourse = async (req, res) => {
  try {
    const { courseName, description, highlights, criteria, price, duration, rating } = req.body;
    const files = req.files;

    if (!courseName || !description || !files || !highlights || !criteria || price === undefined || !duration || !rating) {
      return res.status(400).send({ success: false, message: "All fields are required" });
    }
    const parsedHighlights = JSON.parse(highlights)

    const images = files.map(file => file.path);

    const newCourse = new ShortTermCourse({ courseName, description, images, highlights:parsedHighlights, criteria, price, duration, rating });
    await newCourse.save();
    res.status(201).send({ success: true, message: 'Short-term course created successfully' });
  } catch (error) {
    res.status(500).send({ success: false, message: `Error creating short-term course: ${error.message}` });
  }
};

export const getShortTermCourses = async (req, res) => {
  try {
    const courses = await ShortTermCourse.find({});
    if (courses.length === 0) {
      return res.status(404).send({ success: false, message: "No short-term courses found" });
    }
    res.json(courses);
  } catch (error) {
    res.status(500).send({ success: false, message: `Error retrieving short-term courses: ${error.message}` });
  }
};

export const getShortTermCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ success: false, message: "Invalid course ID format" });
    }

    const course = await ShortTermCourse.findById(id);
    if (!course) {
      return res.status(404).send({ success: false, message: "Short-term course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).send({ success: false, message: `Error retrieving short-term course: ${error.message}` });
  }
};

export const updateShortTermCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { courseName, description, highlights, criteria, price, duration, rating } = req.body;
    const files = req.files;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ success: false, message: "Invalid course ID format" });
    }

    if (!courseName || !description || !files || !highlights || !criteria || price === undefined || !duration || !rating) {
      return res.status(400).send({ success: false, message: "All fields are required" });
    }

    const parsedHighlights = JSON.parse(highlights)
    const images = files.map(file => file.path);

    const course = await ShortTermCourse.findByIdAndUpdate(
      id,
      { courseName, description, images, highlights:parsedHighlights, criteria, price, duration, rating },
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).send({ success: false, message: "Short-term course not found" });
    }
    res.send({ success: true, message: 'Short-term course updated successfully' });
  } catch (error) {
    res.status(500).send({ success: false, message: `Error updating short-term course: ${error.message}` });
  }
};

export const deleteShortTermCourse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ success: false, message: "Invalid course ID format" });
    }

    const course = await ShortTermCourse.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).send({ success: false, message: "Short-term course not found" });
    }

    // Remove images from the filesystem if they exist
    if (course.images) {
      course.images.forEach(image => {
        fs.unlinkSync(path.join(__dirname, '..', image));
      });
    }

    res.send({ success: true, message: 'Short-term course deleted successfully' });
  } catch (error) {
    res.status(500).send({ success: false, message: `Error deleting short-term course: ${error.message}` });
  }
};
