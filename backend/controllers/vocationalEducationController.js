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

const upload = multer({ storage: storage }).fields([{ name: 'photo' }, { name: 'certificateImage' }]);

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
        description, // Ensure 'description' is extracted
        durationOfProgram,
        programAndClassSchedule,
        jobRoles,
        admissionCriteria,
        minAgeLimit,
        maxAgeLimit,
        rating,
        price // Extract 'price'
      } = req.body;

      // Check if required fields are provided
      if (!programName || !whoShouldAttend || !programContents || !aboutProgram || !description ||
        !durationOfProgram || !programAndClassSchedule || !jobRoles || !admissionCriteria ||
        minAgeLimit === undefined || maxAgeLimit === undefined ||
        price === undefined || !rating) { // Include 'price' in the check
        return res.status(400).send({ success: false, message: "All fields are required" });
      }

      const parsedProgramContents = JSON.parse(programContents);
      const parsedJobRoles = JSON.parse(jobRoles);
      const parsedAdmissionCriteria = JSON.parse(admissionCriteria);
      const parsedWhoShouldAttend = JSON.parse(whoShouldAttend);

      const newProgram = new VocationalEducation({
        programName,
        whoShouldAttend: parsedWhoShouldAttend,
        programContents: parsedProgramContents,
        aboutProgram,
        description, // Set 'description'
        durationOfProgram,
        programAndClassSchedule,
        jobRoles: parsedJobRoles,
        admissionCriteria: parsedAdmissionCriteria,
        minAgeLimit,
        maxAgeLimit,
        photo: req.files['photo'] ? req.files['photo'][0].path : null,
        certificateImage: req.files['certificateImage'] ? req.files['certificateImage'][0].path : null,
        rating,
        price // Set 'price' and ensure it's a Number
      });

      await newProgram.save();
      res.status(201).send({ success: true, message: "Vocational Education program created successfully", data: newProgram });
    });
  } catch (error) {
    res.status(400).send({ success: false, message: `Error creating program: ${error.message}` });
  }
};

// Get all vocational education program
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
        description, // Ensure 'description' is extracted
        durationOfProgram,
        programAndClassSchedule,
        jobRoles,
        admissionCriteria,
        minAgeLimit,
        maxAgeLimit,
        rating,
        price // Extract 'price'
      } = req.body;

      const updateData = {
        programName,
        whoShouldAttend,
        programContents,
        aboutProgram,
        description, // Ensure 'description' is extracted
        durationOfProgram,
        programAndClassSchedule,
        jobRoles,
        admissionCriteria,
        minAgeLimit,
        maxAgeLimit,
        rating,
        price // Extract 'price'
      };

      if (programContents) {
        updateData.programContents = JSON.parse(programContents);
      }

      if (jobRoles) {
        updateData.jobRoles = JSON.parse(jobRoles);
      }
      if(admissionCriteria){
        updateData.admissionCriteria = JSON.parse(admissionCriteria);
      }
      if(whoShouldAttend){
        updateData.whoShouldAttend = JSON.parse(whoShouldAttend);
      }

      

      if (req.files['photo']) {
        updateData.photo = req.files['photo'][0].path;
      }

      if (req.files['certificateImage']) {
        updateData.certificateImage = req.files['certificateImage'][0].path;
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
