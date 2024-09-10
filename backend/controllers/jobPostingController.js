import JobPosting from '../models/JobPosting.js';

export const createJobPosting = async (req, res) => {
  const {
    title,
    companyName,
    salaryRange,
    location,
    aboutJob,
    applicationLastDate,
    skills,
    whoCanApply,
    numberOfOpenings,
    aboutCompany,
  } = req.body;

  const posterId = req.user.id;

  try {
    const newJobPosting = new JobPosting({
      title,
      companyName,
      salaryRange,
      location,
      aboutJob,
      applicationLastDate,
      skills,
      whoCanApply,
      numberOfOpenings,
      aboutCompany,
      poster: posterId,
    });

    await newJobPosting.save();
    res.status(201).json({ message: 'Job posting created successfully', job: newJobPosting });
  } catch (error) {
    console.error('Create Job Posting Error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getJobPostingsByPoster = async (req, res) => {
  const posterId = req.user.id;

  try {
    const jobPostings = await JobPosting.find({ poster: posterId });
    res.status(200).json({ jobPostings });
  } catch (error) {
    console.error('Get Job Postings Error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllJobPostings = async (req, res) => {
  try {
    const jobPostings = await JobPosting.find().populate('poster', 'name companyName');
    res.status(200).json({ jobPostings });
  } catch (error) {
    console.error('Get All Job Postings Error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
