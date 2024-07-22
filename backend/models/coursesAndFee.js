import mongoose from "mongoose";

const collegeCourseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  tutionFee: {
    type: String,
    required: true,
  },
  eligibility: {
    type: String,
    required: true,
  }
});

const coursesAndFeeSchema = new mongoose.Schema({
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CollegeInfo',
    required: true,
  },
  aboutCourses: {
    type: String,
    required: true,
  },
  courses: [collegeCourseSchema]
});

export default mongoose.model('CoursesAndFee', coursesAndFeeSchema);
