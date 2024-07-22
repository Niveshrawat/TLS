import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { submitForm } from '../../redux/slice/formSlice';

const RegistrationForm = ({ collegeName }) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    emailId: '',
    collegeName: '',
    twelfthPercentage: '',
    location: '',
    courseName:'',
  });

  const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.form);

  useEffect(() => {
    if (collegeName) {
      setFormData((prevData) => ({
        ...prevData,
        collegeName,
      }));
    }
  }, [collegeName]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (isSubmitted && !loading && !error) {
      toast.success('Form submitted successfully');
      setFormData({
        name: '',
        phoneNumber: '',
        emailId: '',
        collegeName: '',
        twelfthPercentage: '',
        location: '',
        courseName:'',
      });
      setIsSubmitted(false); // Reset submission state
    }
  }, [loading, error, isSubmitted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phoneNumber || !formData.emailId || !formData.collegeName || !formData.twelfthPercentage || !formData.location || !formData.courseName) {
      toast.error('Please fill in all fields');
      return;
    }
    setIsSubmitted(true); // Mark form as submitted
    dispatch(submitForm(formData));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        mx: 'auto',
        marginTop: 2,
        marginBottom: 5,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Register with us
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Email ID"
        name="emailId"
        value={formData.emailId}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="College Name"
        name="collegeName"
        value={formData.collegeName}
        onChange={handleChange}
        fullWidth
        required
        disabled
      />
      <TextField
        label="12th Marks"
        name="twelfthPercentage"
        value={formData.twelfthPercentage}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Course Name"
        name="courseName"
        value={formData.courseName}
        onChange={handleChange}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
    </Box>
  );
};

export default RegistrationForm;
