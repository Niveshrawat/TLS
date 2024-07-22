import Postgraduate from "../models/postgraduate.js";

export const submitForm = async (req, res) => {
  try {
    const { name, phoneNumber, emailId, collegeName, graduationMarks, location, communicationSkill } = req.body;
    if (!name || !phoneNumber || !emailId || !collegeName || graduationMarks === undefined || !location || !communicationSkill) {
      return res.status(400).send({ success: false, message: "All fields are required" });
    }

    // Validate communicationSkill value
    if (!['beginner', 'intermediate', 'advanced'].includes(communicationSkill)) {
      return res.status(400).send({ success: false, message: "Invalid value for communicationSkill" });
    }

    const newPostgraduate = new Postgraduate({ name, phoneNumber, emailId, collegeName, graduationMarks, location, communicationSkill });
    await newPostgraduate.save();
    res.status(201).send('Postgraduate data saved successfully');
  } catch (error) {
    res.status(400).send(`Error saving postgraduate data: ${error.message}`);
  }
};

export const postgraduates = async (req, res) => {
  try {
    const postgraduates = await Postgraduate.find({});
    res.json(postgraduates);
  } catch (error) {
    res.status(500).send(`Error retrieving Postgraduate data: ${error.message}`);
  }
};
