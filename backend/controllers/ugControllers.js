import Undergraduate from "../models/undergraduate.js";

export const submitForm = async (req, res) => {
  try {
    const { name, phoneNumber, emailId, collegeName, twelfthPercentage, location,courseName } = req.body;
    if (!name || !phoneNumber || !emailId || !collegeName || twelfthPercentage=== undefined || !location ||!courseName) {
      return res.status(400).send({ success: false, message: "All fields are required" });
    }

    const newUndergraduate = new Undergraduate({ name, phoneNumber, emailId, collegeName, twelfthPercentage, location, courseName });
    await newUndergraduate.save();
    res.status(201).send('Undergraduate data saved successfully');
  } catch (error) {
    res.status(400).send(`Error saving undergraduate data: ${error.message}`);
  }
};




export const undergraduates = async (req, res) => {
   
    try {
        const undergraduates = await Undergraduate.find({});
        res.json(undergraduates);
      } catch (error) {
        res.status(500).send(`Error retrieving undergraduate data: ${error.message}`);
      }
};
