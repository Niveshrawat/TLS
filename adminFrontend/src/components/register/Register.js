// src/components/registerPage/RegisterPage.js
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Box,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/userSlice';

const RegisterPage = ({ handleClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: '',
    teamLeader: '',
  });
  const [teamLeaders, setTeamLeaders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTeamLeaders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token provided');
          return;
        }

        const response = await fetch('https://api.thelearnskills.com/api/v1/auth/admin/teamLeaders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log('Fetched team leaders:', data); // Log the fetched data
        if (response.ok) {
          setTeamLeaders(data.callers || []);
        } else {
          console.error('Failed to fetch team leaders:', data.message);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchTeamLeaders();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = { ...formData };
    
    // Remove teamLeader field if no valid selection
    if (!payload.teamLeader) {
      delete payload.teamLeader;
    }
  
    dispatch(registerUser(payload));
    handleClose(); // Close the dialog after submitting
  };
  

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        fullWidth
        margin="normal"
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Role</InputLabel>
        <Select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="teamLeader">Team Leader</MenuItem>
          <MenuItem value="caller">Caller</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
      <InputLabel>Team Leader</InputLabel>
      <Select
  name="teamLeader"
  value={formData.teamLeader || ''}
  onChange={handleChange}
>
  <MenuItem value=""><em>None</em></MenuItem>
  {teamLeaders.map((leader) => (
    <MenuItem key={leader._id} value={leader._id}>{leader.name}</MenuItem>
  ))}
</Select>

    </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Register
      </Button>
    </Box>
  );
};

export default RegisterPage;
