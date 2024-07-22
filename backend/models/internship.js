import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  currentCity: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other'],
  },
  type: {
    type: String,
    required: true,
    enum: ['College student', 'Fresher', 'Working professional', 'School student'],
  },
});

export default mongoose.model('Internship', internshipSchema);
