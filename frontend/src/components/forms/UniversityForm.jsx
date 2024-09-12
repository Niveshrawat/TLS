import { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const InquiryForm = ({ open, handleClose }) => {
  const initialFormData = {
    companyName: '',
    name: '',
    emailId: '',
    phoneNumber: '',
    comments: '',
    location: '',
    organization: '',
    designation: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await axios.post(
        'https://api.thelearnskills.com/api/v1/university/submit-university-partnership',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include token in the headers
          },
        }
      );
      console.log('Form submitted successfully:', response.data);
      toast.success('Form submitted successfully');
      setFormData(initialFormData); // Reset form data
      handleClose(); // Close the dialog
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit application.');
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Inquiry Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="University Name"
              name="companyName"
              fullWidth
              margin="normal"
              value={formData.companyName}
              onChange={handleChange}
            />
            <TextField
              label="Name"
              name="name"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              label="Email Id"
              name="emailId"
              fullWidth
              margin="normal"
              value={formData.emailId}
              onChange={handleChange}
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              fullWidth
              margin="normal"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <TextField
              label="Location"
              name="location"
              fullWidth
              margin="normal"
              value={formData.location}
              onChange={handleChange}
            />
            <TextField
              label="Designation"
              name="designation"
              fullWidth
              margin="normal"
              value={formData.designation}
              onChange={handleChange}
            />
            <TextField
              label="Organization"
              name="organization"
              fullWidth
              margin="normal"
              value={formData.organization}
              onChange={handleChange}
            />
            <TextField
              label="Comments"
              name="comments"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={formData.comments}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default InquiryForm;
