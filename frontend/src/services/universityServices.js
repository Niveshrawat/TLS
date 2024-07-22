import axios from 'axios';

const submitForm = async (formData, token) => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/v1/university/submit-university-partnership',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Assuming the response contains a new token, if needed
    const { token: newToken } = response.data;

    // Save the new token to localStorage if it's provided
    if (newToken) {
      localStorage.setItem('token', newToken);
      console.log('New Token:', newToken);
    }

    return response.data;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};

export default {
  submitForm,
};
