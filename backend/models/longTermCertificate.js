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
    enum: ['Tech', 'Non-Tech'],
  },
  courseName: {
    type: String,
    required: true,
  }
});

export default mongoose.model('LongTermCertificate', longTermCertificateSchema);
