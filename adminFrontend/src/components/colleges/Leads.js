import React, { useState } from 'react';
import {
  Modal, Box, Typography, TextField, Button, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CreateLeadModal = ({ open, handleClose, handleSubmit }) => {
  const [leadData, setLeadData] = useState({
    name: '',
    phoneNumber: '',
    emailId: '',
    collegeName: '',
    twelfthPercentage: '',
    location: '',
    courseName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeadData({ ...leadData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(leadData);
    handleClose();  // Close the modal after submission
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h2">
            Create Lead
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Name"
            name="name"
            value={leadData.name}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={leadData.phoneNumber}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email ID"
            name="emailId"
            value={leadData.emailId}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="College Name"
            name="collegeName"
            value={leadData.collegeName}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="12th Percentage"
            name="twelfthPercentage"
            value={leadData.twelfthPercentage}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Location"
            name="location"
            value={leadData.location}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Course Name"
            name="courseName"
            value={leadData.courseName}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateLeadModal;
