import IndustrialWorkshop from "../models/industrialWorkshop.js";

export const submitIndustrialWorkshopForm = async (req, res) => {
  try {
    const { name, emailId, phoneNumber, currentCity, organization, designation, type, workshopType, workshopDate, comments } = req.body;

    // Check for all required fields
    if (!name || !emailId || !phoneNumber || !currentCity || !organization || !designation || !type || !workshopType || !workshopDate) {
      return res.status(400).send({ success: false, message: "All required fields must be filled" });
    }

    const newWorkshop = new IndustrialWorkshop({
      name,
      emailId,
      phoneNumber,
      currentCity,
      organization,
      designation,
      type,  // Include the new type field
      workshopType,
      workshopDate,
      comments,
    });

    await newWorkshop.save();
    res.status(201).send({ success: true, message: 'Industrial Workshop data saved successfully' });
  } catch (error) {
    res.status(400).send({ success: false, message: `Error saving industrial workshop data: ${error.message}` });
  }
};

export const getIndustrialWorkshops = async (req, res) => {
  try {
    const workshops = await IndustrialWorkshop.find({});
    res.json(workshops);
  } catch (error) {
    res.status(500).send({ success: false, message: `Error retrieving industrial workshop data: ${error.message}` });
  }
};
