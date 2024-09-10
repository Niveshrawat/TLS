// models/JobPosting.js
import mongoose from 'mongoose';

const jobPostingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  companyName: { type: String, required: true },
  salaryRange: { type: String, required: true },
  location: { type: String, required: true },
  aboutJob: { type: String, required: true },
  applicationLastDate: { type: Date, required: true },
  skills: { type: [String], required: true },
  whoCanApply: { type: String, required: true },
  numberOfOpenings: { type: Number, required: true },
  aboutCompany: { type: String },
  poster: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPoster', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('JobPosting', jobPostingSchema);

