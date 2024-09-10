import axios from 'axios';

const API_URL = 'https://api.thelearnskills.com/api/v1/job-postings';

export const getJobPostings = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching job postings:', error);
    throw error;
  }
};
