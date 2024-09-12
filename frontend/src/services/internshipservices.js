import axios from 'axios';

const API_URL = 'https://api.thelearnskills.com/api/v1/industry'; // Replace with your backend API URL

export const submitInternshipForm = async (formData, token) => {
  const response = await axios.post(`${API_URL}/submit-industrial-workshop`, formData, {
    headers: {
      Authorization: `Bearer ${token}`, // Attach the token here
    },
  });
  return response.data;
};
