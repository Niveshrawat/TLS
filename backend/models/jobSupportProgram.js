import mongoose from "mongoose";

const jobSupportProgramSchema = new mongoose.Schema({
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
  communicationSkill: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced'],
  },
});

export default mongoose.model('JobSupportProgram', jobSupportProgramSchema);
