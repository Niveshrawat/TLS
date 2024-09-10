import axios from 'axios';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: 'https://api.thelearnskills.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to register a user
export const registerUserApi = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to login a user
export const loginUserApi = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to request a password reset
export const requestPasswordResetApi = async (email, answer, newPassword) => {
  try {
    const response = await api.post('/auth/forgot-password', { email, answer, newPassword });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to reset the password
export const resetPasswordApi = async (token, newPassword) => {
  try {
    const response = await api.post(`/auth/reset-password/${token}`, { newPassword });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Error handler
const handleApiError = (error) => {
  if (error.response) {
    console.error('Error response:', error.response.data);
    throw new Error(error.response.data.message || 'Something went wrong.');
  } else if (error.request) {
    console.error('Error request:', error.request);
    throw new Error('Network error: Please check your internet connection.');
  } else {
    console.error('Error message:', error.message);
    throw new Error('An unexpected error occurred.');
  }
};
