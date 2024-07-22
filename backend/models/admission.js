import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema({
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CollegeInfo',
    required: true,
  },
  aboutAdmissionProcess: {
    type: String,
    required: true,
  },
  programmesOffered: {
    type: [String],
    required: true,
  },
  admissionStatus: {
    type: String,
    required: true,
    enum: ['ongoing', 'closed'],
  },
  howToApply: {
    type: String,
    required: true,
  },
  levelsOfProgrammesOffered: {
    type: [String],
    required: true,
  },
  popularProgrammes: {
    type: [String],
    required: true,
  }
});

export default mongoose.model('Admission', admissionSchema);
