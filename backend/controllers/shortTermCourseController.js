import ShortTermCourse from "../models/shortTermCourse.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

export const createShortTermCourse = async (req, res) => {
  try {
    const {
      courseName,
      description,
      highlights,
      criteria,
      admissionCriteria,
      price,
      duration,
      rating,
    } = req.body;
    const files = req.files;

    if (
      !courseName ||
      !description ||
      !files ||
      !highlights ||
      !criteria ||
      !admissionCriteria ||
      price === undefined ||
      !duration ||
      !rating
    ) {
      return res.status(400).send({ success: false, message: "All fields are required" });
    }

    const parsedHighlights = JSON.parse(highlights);
    const parsedCriteria = JSON.parse(criteria);
    const parsedAdmissionCriteria = JSON.parse(admissionCriteria);

    const images = files.map((file) => file.path);

    const newCourse = new ShortTermCourse({
      courseName,
      description,
      images,
      highlights: parsedHighlights,
      criteria: parsedCriteria,
      admissionCriteria: parsedAdmissionCriteria,
      price,
      duration,
      rating,
    });

    await newCourse.save();
    res.status(201).send({ success: true, message: "Short-term course created successfully" });
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
    const {
      courseName,
      description,
      highlights,
      criteria,
      admissionCriteria,
      price,
      duration,
      rating,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ success: false, message: "Invalid course ID format" });
    }

    // Fetch the existing course
    const existingCourse = await ShortTermCourse.findById(id);
    if (!existingCourse) {
      return res.status(404).send({ success: false, message: "Short-term course not found" });
    }

    // Update images: Preserve existing images and append new ones (if any)
    const newImages = req.files ? req.files.map((file) => file.path) : [];
    const updatedImages = [...existingCourse.images, ...newImages];

    // Remove duplicates (if needed)
    const uniqueImages = Array.from(new Set(updatedImages));

    // Parse JSON fields safely
    const parsedHighlights = highlights ? JSON.parse(highlights) : existingCourse.highlights;
    const parsedCriteria = criteria ? JSON.parse(criteria) : existingCourse.criteria;
    const parsedAdmissionCriteria = admissionCriteria ? JSON.parse(admissionCriteria) : existingCourse.admissionCriteria;

    // Update the course
    const updatedCourse = await ShortTermCourse.findByIdAndUpdate(
      id,
      {
        courseName: courseName || existingCourse.courseName,
        description: description || existingCourse.description,
        images: uniqueImages,
        highlights: parsedHighlights,
        criteria: parsedCriteria,
        admissionCriteria: parsedAdmissionCriteria,
        price: price !== undefined ? price : existingCourse.price,
        duration: duration || existingCourse.duration,
        rating: rating !== undefined ? rating : existingCourse.rating,
      },
      { new: true, runValidators: true }
    );

    res.send({ success: true, message: "Short-term course updated successfully", data: updatedCourse });
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
      course.images.forEach((image) => {
        fs.unlinkSync(path.join(__dirname, "..", image));
      });
    }

    res.send({ success: true, message: "Short-term course deleted successfully" });
  } catch (error) {
    res.status(500).send({ success: false, message: `Error deleting short-term course: ${error.message}` });
  }
};
