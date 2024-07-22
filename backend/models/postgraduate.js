import mongoose from "mongoose";

const postgraduateSchema = new mongoose.Schema({
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
  graduationMarks: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  communicationSkill: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced'],
  },
});

export default mongoose.model('Postgraduate', postgraduateSchema);
