import mongoose from "mongoose";

const industrialCertificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  currentCity: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
});

export default mongoose.model('IndustrialCertificate', industrialCertificateSchema);
