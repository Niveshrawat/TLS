import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api.thelearnskills.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleApiError = (error) => {
  if (error.response) {
    console.error('Error response:', error.response.data);
    throw error.response.data;
  } else if (error.request) {
    console.error('Error request:', error.request);
    throw new Error('Network error: Please check your internet connection.');
  } else {
    console.error('Error message:', error.message);
    throw new Error('An unexpected error occurred.');
  }
};

export const submitForm = async (formData) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    console.log('Token:', token); // Debugging log
    if (!token) {
      throw new Error('No token found');
    }

    const headers = {
      Authorization: `Bearer ${token}`, // Send token in Authorization header
    };
    console.log('Headers:', headers); // Debugging log

    const response = await api.post('/sc/submit-short-term-certificate', formData, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
