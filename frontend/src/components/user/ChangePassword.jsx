import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Box, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { changePassword } from '../../redux/slice/employerSlice';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.employer);

  const [formData, setFormData] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = (field) => {
    if (field === 'old') {
      setShowOldPassword(!showOldPassword);
    } else if (field === 'new') {
      setShowNewPassword(!showNewPassword);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(changePassword(formData)).unwrap();
      toast.success('Password changed successfully');
    } catch (err) {
      const errorMessage = err || 'Error changing password';
      console.log(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <Box
      marginLeft="32rem"
      marginTop="8rem"
      p={3}
      bgcolor="background.paper"
      boxShadow={3}
      borderRadius={1}
      textAlign="center"
      maxWidth={400}
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography variant="h6">Change Password</Typography>
      <TextField
        label="Email"
        name="email"
        fullWidth
        margin="normal"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        label="Old Password"
        name="oldPassword"
        type={showOldPassword ? 'text' : 'password'}
        fullWidth
        margin="normal"
        value={formData.oldPassword}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => handleClickShowPassword('old')}>
                {showOldPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="New Password"
        name="newPassword"
        type={showNewPassword ? 'text' : 'password'}
        fullWidth
        margin="normal"
        value={formData.newPassword}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => handleClickShowPassword('new')}>
                {showNewPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
      >
        {loading ? 'Changing...' : 'Change Password'}
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default ChangePassword;
