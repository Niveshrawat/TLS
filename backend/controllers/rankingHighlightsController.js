import RankingHighlights from "../models/rankingHighlights.js";

export const createRankingHighlight = async (req, res) => {
  try {
    const { collegeId, courseRankings } = req.body;

    if (!collegeId || !courseRankings || !Array.isArray(courseRankings) || courseRankings.length === 0) {
      return res.status(400).send({ success: false, message: "All fields are required and courseRankings should be an array with at least one entry" });
    }

    const newRankingHighlight = new RankingHighlights({ collegeId, courseRankings });
    await newRankingHighlight.save();
    res.status(201).send('Ranking highlight created successfully');
  } catch (error) {
    res.status(400).send(`Error creating ranking highlight: ${error.message}`);
  }
};

export const getRankingHighlights = async (req, res) => {
  try {
    const { collegeId } = req.params;
    const rankingHighlights = await RankingHighlights.find({ collegeId });
    res.json(rankingHighlights);
  } catch (error) {
    res.status(500).send(`Error retrieving ranking highlights: ${error.message}`);
  }
};

export const getRankingHighlightById = async (req, res) => {
  try {
    const { id } = req.params;
    const rankingHighlight = await RankingHighlights.findById(id);
    if (!rankingHighlight) {
      return res.status(404).send('Ranking highlight not found');
    }
    res.json(rankingHighlight);
  } catch (error) {
    res.status(500).send(`Error retrieving ranking highlight: ${error.message}`);
  }
};

export const updateRankingHighlight = async (req, res) => {
  try {
    const { id } = req.params;
    const { courseRankings } = req.body;

    if (!courseRankings || !Array.isArray(courseRankings) || courseRankings.length === 0) {
      return res.status(400).send({ success: false, message: "courseRankings should be an array with at least one entry" });
    }

    const rankingHighlight = await RankingHighlights.findByIdAndUpdate(
      id,
      { courseRankings },
      { new: true, runValidators: true }
    );
    if (!rankingHighlight) {
      return res.status(404).send('Ranking highlight not found');
    }
    res.send('Ranking highlight updated successfully');
  } catch (error) {
    res.status(400).send(`Error updating ranking highlight: ${error.message}`);
  }
};

export const deleteRankingHighlight = async (req, res) => {
  try {
    const { id } = req.params;
    const rankingHighlight = await RankingHighlights.findByIdAndDelete(id);
    if (!rankingHighlight) {
      return res.status(404).send('Ranking highlight not found');
    }
    res.send('Ranking highlight deleted successfully');
  } catch (error) {
    res.status(500).send(`Error deleting ranking highlight: ${error.message}`);
  }
};
