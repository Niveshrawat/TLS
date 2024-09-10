import JobPosting from '../models/JobPosting.js';
import JobApplication from '../models/JobApplication.js';
import User from '../models/userModel.js'; // Job seeker model
import JobPoster from '../models/JobPoster.js'; // Job poster model


// apply for new job
export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.user._id;
  console.log(userId)

  try {
    // Check if the job posting exists
    const job = await JobPosting.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Ensure the video and resume files are uploaded
    if (!req.files || !req.files.video || !req.files.resume) {
      return res.status(400).json({ message: 'Both video and resume files are required' });
    }

    // Check if the user has already applied for the job
    const existingApplication = await JobApplication.findOne({ jobId, userId });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    // Create a new job application
    const newApplication = new JobApplication({
      jobId,
      userId,
      videoUrl: req.files.video[0].path,
      resumeUrl: req.files.resume[0].path,
      status: 'Pending'
    });

    await newApplication.save();
    res.status(201).json({ message: 'Job application submitted successfully', application: newApplication });
  } catch (error) {
    console.error('Job Application Error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// user ne jis jis mai apply kra hai 
export const getApplicationsByUser = async (req, res) => {
  const userId = req.user._id;

  try {
    const applications = await JobApplication.find({ userId }).populate('jobId');
    res.status(200).json({ applications });
  } catch (error) {
    console.error('Get Applications By User Error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


//job poster ki job mai kis kis ne apply kra hai
export const getApplicationsByPoster = async (req, res) => {
    const posterId = req.user.id; // Ensure req.user.id contains the job poster's ID
    
    try {
      // Find all job postings by the poster
      const jobPostings = await JobPosting.find({ poster: posterId });
      
      // Extract job IDs from these postings
      const jobIds = jobPostings.map(posting => posting._id);
      
      
      // Find all applications for these job postings
      const applications = await JobApplication.find({ jobId: { $in: jobIds } })
        .populate('userId', 'name email') 
        .populate('jobId', 'title companyName'); 
      
      res.status(200).json({ applications });
    } catch (error) {
      console.error('Get Applications By Poster Error:', error.message);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
export const updateApplicationStatus = async (req, res) => {
  const { applicationId, status } = req.body;

  try {
    const application = await JobApplication.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status;
    await application.save();
    res.status(200).json({ message: 'Application status updated successfully', application });
  } catch (error) {
    console.error('Update Application Status Error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
