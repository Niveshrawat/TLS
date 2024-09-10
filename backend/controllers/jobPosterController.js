// controllers/jobPosterController.js
import JobPoster from '../models/JobPoster.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const submitJobPosterForm = async (req, res) => {
  try {
    const { name, companyName, industryType, designation, officialEmailId, mobileNumber } = req.body;

    if (!name || !companyName || !industryType || !designation || !officialEmailId || !mobileNumber) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newJobPoster = new JobPoster({
      name,
      companyName,
      industryType,
      designation,
      officialEmailId,
      mobileNumber,
    });

    await newJobPoster.save();
    res.status(201).json({ message: 'Job Poster registration submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const jobPoster = await JobPoster.findOne({ officialEmailId: email });
      if (!jobPoster) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, jobPoster.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ id: jobPoster._id, role: 'jobPoster' }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ token, jobPoster });
    } catch (error) {
      console.error('Login Error:', error.message); // Detailed logging
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };


  export const changePassword = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
  
    try {
      // Check if job poster exists
      const jobPoster = await JobPoster.findOne({ officialEmailId: email });
      if (!jobPoster) {
        return res.status(404).json({ message: 'Job Poster not found' });
      }
  
      // Verify old password
      const isMatch = await bcrypt.compare(oldPassword, jobPoster.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect current password' });
      }
  
      // Hash new password and update
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      jobPoster.password = hashedPassword;
      await jobPoster.save();
  
      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Change Password Error:', error.message);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

export const getPendingJobPosters = async (req, res) => {
    try {
      const pendingPosters = await JobPoster.find({ status: 'pending' });
  
      if (!pendingPosters || pendingPosters.length === 0) {
        return res.status(404).json({ message: 'No pending job posters found' });
      }
  
      res.status(200).json(pendingPosters);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

// Get all job posters
export const getAllJobPosters = async (req, res) => {
  try {
    const jobPosters = await JobPoster.find(); // Fetch all job posters from the database

    if (!jobPosters || jobPosters.length === 0) {
      return res.status(404).json({ message: 'No job posters found' });
    }

    res.status(200).json(jobPosters); // Return the list of job posters
  } catch (error) {
    console.error('Error fetching job posters:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
