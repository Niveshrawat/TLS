import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  board: String,
  schoolName: String,
  passingYear: Number,
  percentage: Number
}, { _id: false });

const graduationSchema = new mongoose.Schema({
  collegeName: String,
  passingYear: Number,
  degree: String,
  percentage: Number
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  dob: { type: Date },
  socialCategory: { type: String, enum: ['general', 'obc', 'sc', 'st', 'other'] },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  maritalStatus: { type: String, enum: ['married', 'unmarried'] },
  physicallyChallenged: { type: Boolean },
  city: { type: String },
  state: { type: String },
  class10: educationSchema,
  class12: educationSchema,
  graduation: graduationSchema,
  answer: { type: String, required: true },
  role: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
