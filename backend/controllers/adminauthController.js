import bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';
import Admin from '../models/adminModel.js';

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
