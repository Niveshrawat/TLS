import mongoose from "mongoose";

const collegeInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  aboutCollege: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  nirfRank: {
    type: Number,
    required: true,
  },
  photos: {
    type: [String],
    required: true,
  }
});

export default mongoose.model('CollegeInfo', collegeInfoSchema);
