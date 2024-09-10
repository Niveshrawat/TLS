import mongoose from 'mongoose';

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
  password: { type: String },
  phone: { type: String },
  address: { type: String },
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
  role: { type: Number, default: 0 },
  googleId: { type: String, unique: true },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, { timestamps: true });

export default mongoose.model('User', userSchema);
