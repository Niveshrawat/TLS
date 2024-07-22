import JobSupportProgram from "../models/jobSupportProgram.js";

export const submitJobSupportProgramForm = async (req, res) => {
  try {
    const { name, emailId, phoneNumber, currentCity, communicationSkill } = req.body;
    if (!name || !emailId || !phoneNumber || !currentCity || !communicationSkill) {
      return res.status(400).send({ success: false, message: "All required fields must be filled" });
    }

    const newProgram = new JobSupportProgram({ name, emailId, phoneNumber, currentCity, communicationSkill });
    await newProgram.save();

    res.status(201).send('Job Support Program data saved successfully');
  } catch (error) {
    res.status(400).send(`Error saving Job Support Program data: ${error.message}`);
  }
};

export const getJobSupportPrograms = async (req, res) => {
  try {
    const programs = await JobSupportProgram.find({});
    res.json(programs);
  } catch (error) {
    res.status(500).send(`Error retrieving Job Support Program data: ${error.message}`);
  }
};
