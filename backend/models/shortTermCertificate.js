import mongoose from 'mongoose';

const shortTermCertificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
    // unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['tech', 'non-tech'],
  },
  courseName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['connected', 'pending', 'follow-up', 'not interested'],
    default: 'pending',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.model('ShortTermCertificate', shortTermCertificateSchema);
