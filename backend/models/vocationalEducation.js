import mongoose from "mongoose";

const programContentSchema = new mongoose.Schema({
  SN: {
    type: Number,
    required: true,
  },
  ModuleName: {
    type: String,
    required: true,
  },
});

const vocationalEducationSchema = new mongoose.Schema({
  programName: {
    type: String,
    required: true,
  },
  whoShouldAttend: {
    type: [String],
    required: true,
  },
  programContents: {
    type: [programContentSchema],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  aboutProgram: {
    type: String,
    required: true,
  },
  durationOfProgram: {
    type: String,
    required: true,
  },
  programAndClassSchedule: {
    type: String,
    required: true,
  },
  jobRoles: {
    type: [String],
    required: true,
  },
  admissionCriteria: {
    type: [String],
    required: true,
  },
  price: { 
    type: Number,
    required: true,
    
  },
  minAgeLimit: {
    type: Number,
    required: true,
    min: 0,
  },
  maxAgeLimit: {
    type: Number,
    required: true,
    min: 0,
  },
  photo: {
    type: String,
    default: null, // Optional: Provide default values
  },
  certificateImage: {
    type: String,
    default: null, // Optional: Provide default values
  },
  rating: {
    type: String,
    default: null, // Optional: Provide default values
  }
}, { timestamps: true });

export default mongoose.model("VocationalEducation", vocationalEducationSchema);
