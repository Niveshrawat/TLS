import mongoose from "mongoose";

const courseRankingSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  }
});

const rankingHighlightsSchema = new mongoose.Schema({
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CollegeInfo',
    required: true,
  },
  courseRankings: [courseRankingSchema]
});

export default mongoose.model('RankingHighlights', rankingHighlightsSchema);
