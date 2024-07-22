import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
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

export const registerUserApi = async (userData) => {
  try {
    console.log('Registering user with data:', userData);
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const loginUserApi = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const { token } = response.data;
    localStorage.setItem('token', token); // Save token to localStorage
    
console.log('Token:', token);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};



