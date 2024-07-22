import mongoose from "mongoose";

const universityPartnershipSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
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
  comments: {
    type: String,
  },
  location:{
    type: String,
    required: true,
  },
  organization:{
    type: String,
    required:true,
  },
  designation:{
    type: String,
    required: true,
  }

});

export default mongoose.model('UniversityPartnership', universityPartnershipSchema);
