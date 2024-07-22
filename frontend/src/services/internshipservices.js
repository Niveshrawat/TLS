import axios from 'axios';

const API_URL = 'http://api.thelearnskills.com/api/v1'; // Replace with your backend API URL

export const submitInternshipForm = async (formData, token) => {
  const response = await axios.post(`${API_URL}/submit-industrial-workshop`, formData, {
    headers: {
      Authorization: `Bearer ${token}`, // Attach the token here
    },
  });
  return response.data;
};
