import axios from 'axios';

// Function to handle user login
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('https://api.thelearnskills.com/api/v1', credentials);
    const { token } = response.data;

    // Save the token in localStorage
    localStorage.setItem('token', token);

    // Optionally, save user information as well
    localStorage.setItem('user', JSON.stringify(response.data.user));

    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.response ? error.response.data : error.message);
    throw error;
  }
};
