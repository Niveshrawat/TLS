import CollegeInfo from "../models/collegeInfo.js";
import fs from 'fs';

export const createCollege = async (req, res) => {
  try {
    const { name, aboutCollege, location, rating, nirfRank } = req.body;
    let photos = [];
    if (req.files) {
      photos = req.files.map(file => file.path);
    }
    const newCollege = new CollegeInfo({ name, aboutCollege, location, rating, nirfRank, photos });
    await newCollege.save();
    res.status(201).json({id: newCollege._id, success: true, message: "College created successfully "})
  } catch (error) {
    res.status(400).send(`Error creating college: ${error.message}`);
  }
};

export const getColleges = async (req, res) => {
  try {
    const colleges = await CollegeInfo.find({});
    res.json(colleges);
  } catch (error) {
    res.status(500).send(`Error retrieving colleges: ${error.message}`);
  }
};

export const getCollegeById = async (req, res) => {
  try {
    const { id } = req.params;
    const college = await CollegeInfo.findById(id);
    if (!college) {
      return res.status(404).send('College not found');
    }
    res.json(college);
  } catch (error) {
    res.status(500).send(`Error retrieving college: ${error.message}`);
  }
};

export const updateCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, aboutCollege, location, rating, nirfRank } = req.body;
    let photos = [];
    if (req.files) {
      photos = req.files.map(file => file.path);
    }
    const college = await CollegeInfo.findByIdAndUpdate(
      id,
      { name, aboutCollege, location, rating, nirfRank, photos },
      { new: true, runValidators: true }
    );
    if (!college) {
      return res.status(404).send('College not found');
    }
    res.send('College updated successfully');
  } catch (error) {
    res.status(400).send(`Error updating college: ${error.message}`);
  }
};

export const deleteCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const college = await CollegeInfo.findByIdAndDelete(id);
    if (!college) {
      return res.status(404).send('College not found');
    }

    // Remove photos from the filesystem
    if (college.photos.length > 0) {
      college.photos.forEach(photo => {
        fs.unlinkSync(photo);
      });
    }

    res.send('College deleted successfully');
  } catch (error) {
    res.status(500).send(`Error deleting college: ${error.message}`);
  }
};
