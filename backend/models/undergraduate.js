import mongoose from "mongoose";

const undergraduateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
  twelfthPercentage: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  }
});

export default mongoose.model('Undergraduate', undergraduateSchema);