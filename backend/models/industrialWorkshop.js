import mongoose from "mongoose";

const industrialWorkshopSchema = new mongoose.Schema({
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
  designation: {
    type: String,
    required: true,
  },
  workshopType: {
    type: String,
    required: true,
    enum: ['Technical', 'Management', 'Safety', 'Other'],
  },
  workshopDate: {
    type: Date,
    required: true,
  },
  comments: {
    type: String,
  },
});

export default mongoose.model('IndustrialWorkshop', industrialWorkshopSchema);
