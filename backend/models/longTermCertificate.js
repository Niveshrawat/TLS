import mongoose from "mongoose";

const longTermCertificateSchema = new mongoose.Schema({
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
    unique: true,
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
  status: {
    type: String,
    enum: ['connected', 'pending', 'follow-up', 'not interested'],
    default: 'pending',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
});

export default mongoose.model('LongTermCertificate', longTermCertificateSchema);
