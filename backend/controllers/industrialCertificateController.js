import IndustrialCertificate from "../models/industrialCertificate.js";

export const submitIndustrialCertificateForm = async (req, res) => {
  try {
    const { name, emailId, phoneNumber, currentCity, organization } = req.body;
    if (!name || !emailId || !phoneNumber || !currentCity || !organization) {
      return res.status(400).send({ success: false, message: "All required fields must be filled" });
    }

    const newCertificate = new IndustrialCertificate({ name, emailId, phoneNumber, currentCity, organization });
    await newCertificate.save();
    res.status(201).send('Industrial Certificate data saved successfully');
  } catch (error) {
    res.status(400).send(`Error saving industrial certificate data: ${error.message}`);
  }
};

export const getIndustrialCertificates = async (req, res) => {
  try {
    const certificates = await IndustrialCertificate.find({});
    res.json(certificates);
  } catch (error) {
    res.status(500).send(`Error retrieving industrial certificate data: ${error.message}`);
  }
};
