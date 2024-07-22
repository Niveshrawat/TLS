import UniversityPartnership from "../models/universityPartnership.js";

export const submitUniversityPartnershipForm = async (req, res) => {
  try {
    const { companyName, name, emailId, phoneNumber, comments, location, organization,designation } = req.body;
    if (!companyName || !name || !emailId || !phoneNumber || !location || !organization || !designation) {
      return res.status(400).send({ success: false, message: "All required fields must be filled" });
    }

    const newPartnership = new UniversityPartnership({ companyName, name, emailId, phoneNumber, comments,location, organization,designation });
    await newPartnership.save();
    res.status(201).send('University Partnership data saved successfully');
  } catch (error) {
    res.status(400).send(`Error saving university partnership data: ${error.message}`);
  }
};

export const getUniversityPartnerships = async (req, res) => {
  try {
    const partnerships = await UniversityPartnership.find({});
    res.json(partnerships);
  } catch (error) {
    res.status(500).send(`Error retrieving university partnership data: ${error.message}`);
  }
};
