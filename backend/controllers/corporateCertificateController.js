import CorporateCertificate from "../models/corporateCertificate.js";


export const submitCorporateCertificateForm = async (req, res) => {
  try {
    const { name, emailId, phoneNumber, currentCity, organization } = req.body;
    if (!name || !emailId || !phoneNumber || !currentCity || !organization) {
      return res.status(400).send({ success: false, message: "All required fields must be filled" });
    }

    const newCertificate = new CorporateCertificate({ name, emailId, phoneNumber, currentCity, organization });
    await newCertificate.save();
    // const whatsappMessage = `Hello ${name},\n\nThank you for applying for the ${organization}. We have received your application and will process it shortly.\n\nBest regards,\nThe Learn Skill`;
      
    // wbm.start().then(async () =>{
    //   const phones= phoneNumber;
    //   const message = "hello";
    //   await wbm.send(phones,message);
    //   await wbm.send();
    // }).catch(err => console.log(err));
    res.status(201).send('Corporate Certificate data saved successfully');
  } catch (error) {
    res.status(400).send(`Error saving corporate certificate data: ${error.message}`);
  }
};

export const getCorporateCertificates = async (req, res) => {
  try {
    const certificates = await CorporateCertificate.find({});
    res.json(certificates);
  } catch (error) {
    res.status(500).send(`Error retrieving corporate certificate data: ${error.message}`);
  }
};
