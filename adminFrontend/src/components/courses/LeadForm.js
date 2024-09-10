import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const AddLeadForm = ({ handleClose }) => {
  const [leadData, setLeadData] = useState({
    name: '',
    phoneNumber: '',
    emailId: '',
    location: '',
    category: '',
    courseName: '',
   });

  const handleChange = (e) => {
    setLeadData({ ...leadData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('https://api.thelearnskills.com/api/v1/sc/submit-short-term-certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(leadData)
      });

      const data = await response.json();
      if (data.message === 'Lead created successfully') {
        handleClose(); // Close the modal after successful submission
        // Optionally refresh the table or notify the user of success
      } else {
        console.error('Error creating lead:', data.message);
      }
    } catch (error) {
      console.error('Error creating lead:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        name="name"
        label="Name"
        value={leadData.name}
        onChange={handleChange}
        required
      />
      <TextField
        name="phoneNumber"
        label="Phone Number"
        value={leadData.phoneNumber}
        onChange={handleChange}
        required
      />
      <TextField
        name="emailId"
        label="Email ID"
        value={leadData.emailId}
        onChange={handleChange}
        required
      />
      <TextField
        name="location"
        label="Location"
        value={leadData.location}
        onChange={handleChange}
      />
      <TextField
        name="category"
        label="Category"
        value={leadData.category}
        onChange={handleChange}
      />
      <TextField
        name="courseName"
        label="Course Name"
        value={leadData.courseName}
        onChange={handleChange}
      />
     
      <Button type="submit" variant="contained" color="primary">Submit</Button>
    </Box>
  );
};

export default AddLeadForm;
