// models/shortTermCourse.js
import mongoose from "mongoose";

const shortTermCourseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  highlights: {
    type: [String],
    required: true,
  },
  criteria: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  rating:{
    type: String,
    required: true,
  }
});

export default mongoose.model('ShortTermCourse', shortTermCourseSchema);