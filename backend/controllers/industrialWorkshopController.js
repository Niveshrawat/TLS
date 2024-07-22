import IndustrialWorkshop from "../models/industrialWorkshop.js";

export const submitIndustrialWorkshopForm = async (req, res) => {
  try {
    const { name, emailId, phoneNumber, currentCity, organization, designation, workshopType, workshopDate, comments } = req.body;
    if (!name || !emailId || !phoneNumber || !currentCity || !organization || !designation || !workshopType || !workshopDate) {
      return res.status(400).send({ success: false, message: "All required fields must be filled" });
    }

    const newWorkshop = new IndustrialWorkshop({ name, emailId, phoneNumber, currentCity, organization, designation, workshopType, workshopDate, comments });
    await newWorkshop.save();
    res.status(201).send('Industrial Workshop data saved successfully');
  } catch (error) {
    res.status(400).send(`Error saving industrial workshop data: ${error.message}`);
  }
};

export const getIndustrialWorkshops = async (req, res) => {
  try {
    const workshops = await IndustrialWorkshop.find({});
    res.json(workshops);
  } catch (error) {
    res.status(500).send(`Error retrieving industrial workshop data: ${error.message}`);
  }
};
