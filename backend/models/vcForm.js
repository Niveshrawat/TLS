import mongoose from "mongoose";

const vcFormSchema = new mongoose.Schema({
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
  courseName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: [ 'Enquiry',
    'Enc',
    'Cold',
    'Dead',
    'Connected',
    'Warm',
    'Hot',
    'Register', 
    'Enroll', 'Pending'],
    default: 'Pending',
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

export default mongoose.model('vcForm', vcFormSchema);
