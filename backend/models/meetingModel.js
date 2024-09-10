import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  meetingLink: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model('Meeting', meetingSchema);
