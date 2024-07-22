import mongoose from "mongoose";

const placementSchema = new mongoose.Schema({
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CollegeInfo',
    required: true,
  },
  highestPackage: {
    type: Number,
    required: true,
  },
  averagePackage: {
    type: Number,
    required: true,
  },
  totalRecruiters: {
    type: Number,
    required: true,
  },
  totalOffers: {
    type: Number,
    required: true,
  },
  averagePackagesLastTwoYears: {
    type: [Number],
    required: true,
  },
  topRecruitingCompanies: {
    type: [String],
    required: true,
  }
});

export default mongoose.model('Placement', placementSchema);
