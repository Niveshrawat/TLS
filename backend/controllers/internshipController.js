import Internship from "../models/internship.js";

export const submitInternshipForm = async (req, res) => {
  try {
    const { name, emailId, phoneNumber, currentCity, gender, type } = req.body;
    if (!name || !emailId || !phoneNumber || !currentCity || !gender || !type) {
      return res.status(400).send({ success: false, message: "All fields are required" });
    }

    const newInternship = new Internship({ name, emailId, phoneNumber, currentCity, gender, type });
    await newInternship.save();
    res.status(201).send('Internship data saved successfully');
  } catch (error) {
    res.status(400).send(`Error saving internship data: ${error.message}`);
  }
};

export const getInternships = async (req, res) => {
  try {
    const internships = await Internship.find({});
    res.json(internships);
  } catch (error) {
    res.status(500).send(`Error retrieving internship data: ${error.message}`);
  }
};
