import VocationalEducation from "../models/vocationalEducation.js";
import multer from "multer";
import path from "path";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage }).single('photo');

// Create a new vocational education record
export const createVocationalEducation = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).send({ success: false, message: "Error uploading file" });
      }
      const {
        programName,
        whoShouldAttend,
        programContents,
        aboutProgram,
        durationOfProgram,
        programAndClassSchedule,
        jobRoles,
        admissionCriteria,
        minAgeLimit,
        maxAgeLimit,
        attendanceCriteria
      } = req.body;

      if (!programName || !whoShouldAttend || !programContents || !aboutProgram || !durationOfProgram ||
        !programAndClassSchedule || !jobRoles || !admissionCriteria || minAgeLimit === undefined || maxAgeLimit === undefined ||
        !attendanceCriteria) {
        return res.status(400).send({ success: false, message: "All fields are required" });
      }

      const parsedProgramContents = JSON.parse(programContents);
      const parsedJobRoles = JSON.parse(jobRoles);

      const newProgram = new VocationalEducation({
        programName,
        whoShouldAttend,
        programContents: parsedProgramContents,
        aboutProgram,
        durationOfProgram,
        programAndClassSchedule,
        jobRoles: parsedJobRoles,
        admissionCriteria,
        minAgeLimit,
        maxAgeLimit,
        attendanceCriteria,
        photo: req.file ? req.file.path : null
      });

      await newProgram.save();
      res.status(201).send({ success: true, message: "Vocational Education program created successfully", data: newProgram });
    });
  } catch (error) {
    res.status(400).send({ success: false, message: `Error creating program: ${error.message}` });
  }
};

// Get all vocational education programs
export const getVocationalEducation = async (req, res) => {
  try {
    const programs = await VocationalEducation.find({});
    res.json(programs);
  } catch (error) {
    res.status(500).send({ success: false, message: `Error retrieving programs: ${error.message}` });
  }
};

// Get a specific vocational education program by ID
export const getVocationalEducationById = async (req, res) => {
  try {
    const { id } = req.params;
    const program = await VocationalEducation.findById(id);

    if (!program) {
      return res.status(404).send({ success: false, message: "Program not found" });
    }

    res.json(program);
  } catch (error) {
    res.status(500).send({ success: false, message: `Error retrieving program: ${error.message}` });
  }
};

// Update a specific vocational education program by ID
export const updateVocationalEducation = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).send({ success: false, message: "Error uploading file" });
      }
      const { id } = req.params;
      const {
        programName,
        whoShouldAttend,
        programContents,
        aboutProgram,
        durationOfProgram,
        programAndClassSchedule,
        jobRoles,
        admissionCriteria,
        minAgeLimit,
        maxAgeLimit,
        attendanceCriteria
      } = req.body;

      const updateData = {
        programName,
        whoShouldAttend,
        aboutProgram,
        durationOfProgram,
        programAndClassSchedule,
        admissionCriteria,
        minAgeLimit,
        maxAgeLimit,
        attendanceCriteria,
      };

      if (programContents) {
        updateData.programContents = JSON.parse(programContents);
      }

      if (jobRoles) {
        updateData.jobRoles = JSON.parse(jobRoles);
      }

      if (req.file) {
        updateData.photo = req.file.path;
      }

      const program = await VocationalEducation.findByIdAndUpdate(id, updateData, { new: true });

      if (!program) {
        return res.status(404).send({ success: false, message: "Program not found" });
      }

      res.json({ success: true, message: "Program updated successfully", data: program });
    });
  } catch (error) {
    res.status(400).send({ success: false, message: `Error updating program: ${error.message}` });
  }
};

// Delete a specific vocational education program by ID
export const deleteVocationalEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const program = await VocationalEducation.findByIdAndDelete(id);

    if (!program) {
      return res.status(404).send({ success: false, message: "Program not found" });
    }

    res.json({ success: true, message: "Program deleted successfully" });
  } catch (error) {
    res.status(400).send({ success: false, message: `Error deleting program: ${error.message}` });
  }
};
