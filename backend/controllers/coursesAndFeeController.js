import CoursesAndFee from "../models/coursesAndFee.js";

export const createCourseAndFee = async (req, res) => {
  try {
    const { collegeId, aboutCourses, courses } = req.body;

    if (!collegeId || !aboutCourses || !courses || !Array.isArray(courses) || courses.length === 0) {
      return res.status(400).send({ success: false, message: "All fields are required and courses should be an array with at least one entry" });
    }

    const newCourseAndFee = new CoursesAndFee({ collegeId, aboutCourses, courses });
    await newCourseAndFee.save();
    res.status(201).send('Courses and Fees created successfully');
  } catch (error) {
    res.status(400).send(`Error creating courses and fees: ${error.message}`);
  }
};

export const getCoursesAndFees = async (req, res) => {
  try {
    const { collegeId } = req.params;
    const coursesAndFees = await CoursesAndFee.find({ collegeId });
    res.json(coursesAndFees);
  } catch (error) {
    res.status(500).send(`Error retrieving courses and fees: ${error.message}`);
  }
};

export const getCourseAndFeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const courseAndFee = await CoursesAndFee.findById(id);
    if (!courseAndFee) {
      return res.status(404).send('Course and Fee not found');
    }
    res.json(courseAndFee);
  } catch (error) {
    res.status(500).send(`Error retrieving course and fee: ${error.message}`);
  }
};

export const updateCourseAndFee = async (req, res) => {
  try {
    const { id } = req.params;
    const { aboutCourses, courses } = req.body;

    if (!aboutCourses || !courses || !Array.isArray(courses) || courses.length === 0) {
      return res.status(400).send({ success: false, message: "All fields are required and courses should be an array with at least one entry" });
    }

    const courseAndFee = await CoursesAndFee.findByIdAndUpdate(
      id,
      { aboutCourses, courses },
      { new: true, runValidators: true }
    );
    if (!courseAndFee) {
      return res.status(404).send('Course and Fee not found');
    }
    res.send('Courses and Fees updated successfully');
  } catch (error) {
    res.status(400).send(`Error updating courses and fees: ${error.message}`);
  }
};

export const deleteCourseAndFee = async (req, res) => {
  try {
    const { id } = req.params;
    const courseAndFee = await CoursesAndFee.findByIdAndDelete(id);
    if (!courseAndFee) {
      return res.status(404).send('Course and Fee not found');
    }
    res.send('Courses and Fees deleted successfully');
  } catch (error) {
    res.status(500).send(`Error deleting courses and fees: ${error.message}`);
  }
};
