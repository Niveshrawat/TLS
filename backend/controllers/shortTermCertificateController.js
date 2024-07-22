import ShortTermCertificate from "../models/shortTermCertificate.js";

export const submitShortTermCertificateForm = async (req, res) => {
  try {
    const { name, phoneNumber, emailId, location, category,courseName } = req.body;
    if (!name || !phoneNumber || !emailId || !location || !category || !courseName) {
      return res.status(400).send({ success: false, message: "All fields are required" });
    }

    const newCertificate = new ShortTermCertificate({ name, phoneNumber, emailId, location, category, courseName });
    await newCertificate.save();
    res.status(201).send('Short-term certificate data saved successfully');
  } catch (error) {
    res.status(400).send(`Error saving short-term certificate data: ${error.message}`);
  }
};

export const getShortTermCertificates = async (req, res) => {
  try {
    const certificates = await ShortTermCertificate.find({});
    res.json(certificates);
  } catch (error) {
    res.status(500).send(`Error retrieving short-term certificate data: ${error.message}`);
  }
};
