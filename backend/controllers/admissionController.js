import Admission from "../models/admission.js";

export const createAdmission = async (req, res) => {
  try {
    const { collegeId, aboutAdmissionProcess, programmesOffered, admissionStatus, howToApply, levelsOfProgrammesOffered, popularProgrammes } = req.body;
    const newAdmission = new Admission({ collegeId, aboutAdmissionProcess, programmesOffered, admissionStatus, howToApply, levelsOfProgrammesOffered, popularProgrammes });
    await newAdmission.save();
    res.status(201).send('Admission created successfully');
  } catch (error) {
    res.status(400).send(`Error creating admission: ${error.message}`);
  }
};

export const getAdmissions = async (req, res) => {
  try {
    const { collegeId } = req.params;
    const admissions = await Admission.find({ collegeId });
    res.json(admissions);
  } catch (error) {
    res.status(500).send(`Error retrieving admissions: ${error.message}`);
  }
};

export const getAdmissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const admission = await Admission.findById(id);
    if (!admission) {
      return res.status(404).send('Admission not found');
    }
    res.json(admission);
  } catch (error) {
    res.status(500).send(`Error retrieving admission: ${error.message}`);
  }
};

export const updateAdmission = async (req, res) => {
  try {
    const { id } = req.params;
    const { aboutAdmissionProcess, programmesOffered, admissionStatus, howToApply, levelsOfProgrammesOffered, popularProgrammes } = req.body;
    const admission = await Admission.findByIdAndUpdate(
      id,
      { aboutAdmissionProcess, programmesOffered, admissionStatus, howToApply, levelsOfProgrammesOffered, popularProgrammes },
      { new: true, runValidators: true }
    );
    if (!admission) {
      return res.status(404).send('Admission not found');
    }
    res.send('Admission updated successfully');
  } catch (error) {
    res.status(400).send(`Error updating admission: ${error.message}`);
  }
};

export const deleteAdmission = async (req, res) => {
  try {
    const { id } = req.params;
    const admission = await Admission.findByIdAndDelete(id);
    if (!admission) {
      return res.status(404).send('Admission not found');
    }
    res.send('Admission deleted successfully');
  } catch (error) {
    res.status(500).send(`Error deleting admission: ${error.message}`);
  }
};
