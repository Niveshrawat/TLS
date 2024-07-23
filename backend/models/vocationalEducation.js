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
    type: String,
    required: true,
  },
  programContents: {
    type: [programContentSchema],
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
    type: String,
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
  attendanceCriteria: {
    type: String,
    required: true,
  },
  photo: {
    type: String, // Store the URL of the uploaded photo
  }
}, { timestamps: true });

export default mongoose.model("VocationalEducation", vocationalEducationSchema);
