// src/components/InquiryForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Box, Typography, TextField, Button, MenuItem, useMediaQuery } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { submitForm } from '../../redux/slice/shortSlice';
import 'react-toastify/dist/ReactToastify.css';

const InquiryForm = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    emailId: '',
    location: '',
    category: '',
    courseName:'',
  });

  const domains = ['Tech', 'Non-Tech'];

  const dispatch = useDispatch();
  const formState = useSelector((state) => state.short);
  const { loading } = formState;

  const isMobile = useMediaQuery('(max-width:600px)');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(submitForm(formData)).unwrap(); // Use unwrap() to handle fulfilled/rejected directly
      toast.success('Form submitted successfully');
      setFormData({
        name: '',
        phoneNumber: '',
        emailId: '',
        location: '',
        category: '',
        courseName: '',
      });
      handleClose();
    } catch (error) {
      toast.error(`Error submitting form: ${error}`);
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
            width: isMobile ? '90%' : 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: isMobile ? 2 : 4,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom fontWeight="bold">
            Short Term Courses
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              margin="normal"
              value={formData.name}
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
              label="Email"
              name="emailId"
              fullWidth
              margin="normal"
              value={formData.emailId}
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
              label="Course Name"
              name="courseName"
              fullWidth
              margin="normal"
              value={formData.courseName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              select
              label="Interested Domain"
              variant="outlined"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {domains.map((domain, index) => (
                <MenuItem key={index} value={domain}>
                  {domain}
                </MenuItem>
              ))}
            </TextField>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '2rem' }}
              disabled={loading}
            >
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
