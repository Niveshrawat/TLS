import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPosting', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  videoUrl: { type: String, required: true },
  resumeUrl: { type: String }, // New field for resume URL
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('JobApplication', jobApplicationSchema);
