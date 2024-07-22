import LongTermCertificate from "../models/longTermCertificate.js";

export const submitLongTermCertificateForm = async (req, res) => {
  try {
    const { name, phoneNumber, emailId, location, category } = req.body;
    if (!name || !phoneNumber || !emailId || !location || !category) {
      return res.status(400).send({ success: false, message: "All fields are required" });
    }

    const newCertificate = new LongTermCertificate({ name, phoneNumber, emailId, location, category });
    await newCertificate.save();
    res.status(201).send('Long-term certificate data saved successfully');
  } catch (error) {
    res.status(400).send(`Error saving long-term certificate data: ${error.message}`);
  }
};

export const getLongTermCertificates = async (req, res) => {
  try {
    const certificates = await LongTermCertificate.find({});
    res.json(certificates);
  } catch (error) {
    res.status(500).send(`Error retrieving long-term certificate data: ${error.message}`);
  }
};
