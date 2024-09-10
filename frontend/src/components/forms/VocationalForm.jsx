import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';


const VocationalForm = ({ open, handleClose, courseName }) => {
  const initialFormData = {
    name: '',
    phoneNumber: '',
    emailId: '',
    location: '',
    courseName: courseName || '', // Prefill course name
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await axios.post(
        'https://api.thelearnskills.com/api/v1/vcForm/submit-vc-form',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include token in the headers
          },
        }
      );
      console.log('Form submitted successfully:', response.data);
      toast.success('Form submitted successfully')
      setFormData(initialFormData); // Reset form data
      handleClose(); // Close the dialog
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Failed to submit application.");
    
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Enroll in {courseName}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="phoneNumber"
          label="Phone Number"
          type="text"
          fullWidth
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="emailId"
          label="Email ID"
          type="email"
          fullWidth
          value={formData.emailId}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="location"
          label="Location"
          type="text"
          fullWidth
          value={formData.location}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="courseName"
          label="Course Name"
          type="text"
          fullWidth
          value={formData.courseName}
          onChange={handleChange}
          disabled
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VocationalForm;
