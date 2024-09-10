import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Avatar, TextField, Grid } from '@mui/material';

const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

// Function to generate a color based on a hash code
const getColorFromHash = (hash) => {
  const colors = [
    '#FF5722', '#E91E63', '#9C27B0', '#3F51B5', '#2196F3',
    '#00BCD4', '#009688', '#4CAF50', '#FFEB3B', '#FF9800'
  ];
  return colors[Math.abs(hash) % colors.length];
};

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`https://api.thelearnskills.com/api/v1/auth/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.success) {
          setUser(data.user);
        } else {
          console.error('Invalid data format:', data);
        }
      })
      .catch((error) => console.error('Error fetching user data:', error));
  }, [userId]);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ width: '95%', marginTop: '5rem' }}>
      {/* User Avatar and Name */}
      <Box display="flex" alignItems="center" gap={2} marginBottom="2rem">
        <Avatar sx={{ bgcolor: getColorFromHash(hashCode(user.email)), width: 60, height: 60 }}>
          {user.name.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h5">{user.name}</Typography>
      </Box>

      {/* Personal Details Section */}
      <Typography variant="h6" marginBottom="1rem"><strong>Personal Details</strong></Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Email" value={user.email} variant="outlined" margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Phone Number" value={user.phone} variant="outlined" margin="normal" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Address" value={user.address} variant="outlined" margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Date of Birth" value={new Date(user.dob).toLocaleDateString()} variant="outlined" margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Social Category" value={user.socialCategory} variant="outlined" margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Gender" value={user.gender} variant="outlined" margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Marital Status" value={user.maritalStatus} variant="outlined" margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="City" value={user.city} variant="outlined" margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="State" value={user.state} variant="outlined" margin="normal" />
        </Grid>
      </Grid>

      {/* Education Details Section */}
      <Typography variant="h6" marginTop="2rem" marginBottom="1rem"><strong>Education Details</strong></Typography>

      {/* Class 10 Details */}
      <Typography variant="h6" marginBottom="1rem"><strong>Class 10</strong></Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Board" value={user.class10?.board} variant="outlined" margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="School Name" value={user.class10?.schoolName} variant="outlined" margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Passing Year" value={user.class10?.passingYear} variant="outlined" margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Percentage" value={user.class10?.percentage} variant="outlined" margin="normal" />
        </Grid>
      </Grid>

      {/* Class 12 Details */}
      <Typography variant="h6" marginTop="2rem" marginBottom="1rem"><strong>Class 12</strong></Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Board" value={user.class12?.board} variant="outlined" margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="School Name" value={user.class12?.schoolName} variant="outlined" margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Passing Year" value={user.class12?.passingYear} variant="outlined" margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Percentage" value={user.class12?.percentage} variant="outlined" margin="normal" />
        </Grid>
      </Grid>

      {/* Graduation Details */}
      <Typography variant="h6" marginTop="2rem" marginBottom="1rem"><strong>Graduation</strong></Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="College Name" value={user.graduation?.collegeName} variant="outlined" margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Degree" value={user.graduation?.degree} variant="outlined" margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Passing Year" value={user.graduation?.passingYear} variant="outlined" margin="normal" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Percentage" value={user.graduation?.percentage} variant="outlined" margin="normal" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
