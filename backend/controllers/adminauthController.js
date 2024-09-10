import bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';
import Admin from '../models/adminModel.js';
import JobPoster from '../models/JobPoster.js';
import nodemailer from 'nodemailer';




// Register User
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, address, role, teamLeader } = req.body;

    if (!name || !email || !password || !phone || !address) {
      return res.status(400).send({ success: false, message: 'All fields are required' });
    }

    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Admin({ name, email, password: hashedPassword, phone, address, role, teamLeader });
    await newUser.save();
    
    res.status(201).send({ success: true, message: 'User registered successfully' });
  } catch (error) {
    res.status(400).send({ success: false, message: `Error registering user: ${error.message}` });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ success: false, message: 'Email and password are required' });
    }

    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).send({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ success: false, message: 'Invalid credentials' });
    }

    const token = Jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ success: true, message: 'Login successful', token, user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(400).send({ success: false, message: `Error logging in: ${error.message}` });
  }
};


export const getAllTlandCallerController = async (req, res) => {
  try {
    // Find users with role either 'teamLeader' or 'caller' excluding sensitive fields
    const users = await Admin.find({ role: { $in: ['teamLeader', 'caller'] } }, '-password -answer');
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving users",
      error: error.message,
    });
  }
};

// Approve or Reject job poster
export const approveJobPoster = async (req, res) => {
  try {
    const { posterId } = req.params;
    const { status } = req.body;

    const jobPoster = await JobPoster.findById(posterId);
    if (!jobPoster) return res.status(404).json({ message: 'Job Poster not found' });

    if (status === 'approved') {
      // Generate random password
      const password = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(password, 10);

      jobPoster.status = 'approved';
      jobPoster.password = hashedPassword;

      // Send email with login credentials
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'niveshrawat2002@gmail.com',
        pass: 'ghby mwaz njgc gkvi',
        },
      });

      const mailOptions = {
        from: "niveshrawat2002@gmail.com",
        to: jobPoster.officialEmailId,
        subject: 'Your Job Portal Account Approved',
        text: `Your account has been approved. You can log in with the following credentials:\n\nEmail: ${jobPoster.officialEmailId}\nPassword: ${password}\n\nPlease change your password after logging in.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ message: 'Error sending email', error });
        }
      });
    } else if (status === 'rejected') {
      jobPoster.status = 'rejected';
    } else {
      return res.status(400).json({ message: 'Invalid status' });
    }

    await jobPoster.save();
    res.status(200).json({ message: `Job Poster ${status}` });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

//Get all Team Leaders
export const getAllTeamLeaders = async (req, res) => {
  try {
    const callers = await Admin.find({ role: "teamLeader" }, "name _id");
    res.status(200).json({
      success: true,
      message: "Team Leaders retrieved successfully",
      callers,
    });
  } catch (error) {
    console.error("Error retrieving callers:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving callers",
      error,
    });
  }
};