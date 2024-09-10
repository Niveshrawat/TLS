// models/JobPoster.js
import mongoose from 'mongoose';

const jobPosterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyName: { type: String, required: true },
  industryType: { type: String, required: true },
  designation: { type: String, required: true },
  officialEmailId: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminNote: { type: String },
  password: { type: String }, // Hashed password
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('JobPoster', jobPosterSchema);
