import Placement from "../models/placement.js";

export const createPlacement = async (req, res) => {
  try {
    const { collegeId, highestPackage, averagePackage, totalRecruiters, totalOffers, averagePackagesLastTwoYears, topRecruitingCompanies } = req.body;
    const newPlacement = new Placement({ collegeId, highestPackage, averagePackage, totalRecruiters, totalOffers, averagePackagesLastTwoYears, topRecruitingCompanies });
    await newPlacement.save();
    res.status(201).send('Placement created successfully');
  } catch (error) {
    res.status(400).send(`Error creating placement: ${error.message}`);
  }
};

export const getPlacements = async (req, res) => {
  try {
    const { collegeId } = req.params;
    const placements = await Placement.find({ collegeId });
    res.json(placements);
  } catch (error) {
    res.status(500).send(`Error retrieving placements: ${error.message}`);
  }
};

export const getPlacementById = async (req, res) => {
  try {
    const { id } = req.params;
    const placement = await Placement.findById(id);
    if (!placement) {
      return res.status(404).send('Placement not found');
    }
    res.json(placement);
  } catch (error) {
    res.status(500).send(`Error retrieving placement: ${error.message}`);
  }
};

export const updatePlacement = async (req, res) => {
  try {
    const { id } = req.params;
    const { highestPackage, averagePackage, totalRecruiters, totalOffers, averagePackagesLastTwoYears, topRecruitingCompanies } = req.body;
    const placement = await Placement.findByIdAndUpdate(
      id,
      { highestPackage, averagePackage, totalRecruiters, totalOffers, averagePackagesLastTwoYears, topRecruitingCompanies },
      { new: true, runValidators: true }
    );
    if (!placement) {
      return res.status(404).send('Placement not found');
    }
    res.send('Placement updated successfully');
  } catch (error) {
    res.status(400).send(`Error updating placement: ${error.message}`);
  }
};

export const deletePlacement = async (req, res) => {
  try {
    const { id } = req.params;
    const placement = await Placement.findByIdAndDelete(id);
    if (!placement) {
      return res.status(404).send('Placement not found');
    }
    res.send('Placement deleted successfully');
  } catch (error) {
    res.status(500).send(`Error deleting placement: ${error.message}`);
  }
};
