import axios from 'axios';

const API_URL = 'https://api.thelearnskills.com/api/v1/college';

const createCollege = (collegeData) => {
  return axios.post(`${API_URL}/create-colleges`, collegeData, { withCredentials: true });
};

const getColleges = () => {
  return axios.get(`${API_URL}/colleges`);
};

export { createCollege, getColleges };
