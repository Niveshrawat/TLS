import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { submitUniversityPartnershipForm } from '../../redux/slice/universitySlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InquiryForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.user.token); // Ensure correct path to token

  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    emailId: '',
    phoneNumber: '',
    comments: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { companyName, name, emailId, phoneNumber, comments } = formData;

    if (!companyName || !name || !emailId || !phoneNumber || !comments) {
      toast.error('Please complete all fields');
    } else if (!token) {
      toast.error('User not authenticated');
    } else {
      dispatch(submitUniversityPartnershipForm({ formData, token }));
      handleClose();
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