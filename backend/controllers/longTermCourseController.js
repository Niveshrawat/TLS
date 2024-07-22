// controllers/longTermCourseController.js
import LongTermCourse from "../models/longTermCourse.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

export const createLongTermCourse = async (req, res) => {
  try {
    const { courseName, description, highlights, criteria, price, duration } = req.body;
    const files = req.files;

    if (!courseName || !description || !files || !highlights || !criteria || price === undefined || !duration) {
      return res.status(400).send({ success: false, message: "All fields are required" });
    }

    const images = files.map(file => file.path);

    const newCourse = new LongTermCourse({ courseName, description, images, highlights, criteria, price, duration });
    await newCourse.save();
    res.status(201).send({ success: true, message: 'Long-term course created successfully' });
  } catch (error) {
    res.status(500).send({ success: false, message: `Error creating long-term course: ${error.message}` });
  }
};

export const getLongTermCourses = async (req, res) => {
  try {
    const courses = await LongTermCourse.find({});
    if (courses.length === 0) {
      return res.status(404).send({ success: false, message: "No long-term courses found" });
    }
    res.json(courses);
  } catch (error) {
    res.status(500).send({ success: false, message: `Error retrieving long-term courses: ${error.message}` });
  }
};

export const getLongTermCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ success: false, message: "Invalid course ID format" });
    }

    const course = await LongTermCourse.findById(id);
    if (!course) {
      return res.status(404).send({ success: false, message: "Long-term course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).send({ success: false, message: `Error retrieving long-term course: ${error.message}` });
  }
};

export const updateLongTermCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { courseName, description, highlights, criteria, price, duration } = req.body;
    const files = req.files;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ success: false, message: "Invalid course ID format" });
    }

    if (!courseName || !description || !files || !highlights || !criteria || price === undefined || !duration) {
      return res.status(400).send({ success: false, message: "All fields are required" });
    }

    const images = files.map(file => file.path);

    const course = await LongTermCourse.findByIdAndUpdate(
      id,
      { courseName, description, images, highlights, criteria, price, duration },
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).send({ success: false, message: "Long-term course not found" });
    }
    res.send({ success: true, message: 'Long-term course updated successfully' });
  } catch (error) {
    res.status (500).send({ success: false, message: `Error updating long-term course: ${error.message}` });
  }
};

export const deleteLongTermCourse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ success: false, message: "Invalid course ID format" });
    }

    const course = await LongTermCourse.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).send({ success: false, message: "Long-term course not found" });
    }
    
    // Remove images from the filesystem
    course.images.forEach(image => {
      fs.unlinkSync(path.join(__dirname, '..', image));
    });

    res.send({ success: true, message: 'Long-term course deleted successfully' });
  } catch (error) {
    res.status(500).send({ success: false, message: `Error deleting long-term course: ${error.message}` });
  }
};