import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom'; // useParams for dynamic routing

const CollegeInfo = () => {
  const { _id } = useParams(); // Assume the route is `/colleges/:id`
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    // Fetch college details
    const fetchCollegeDetails = async () => {
      try {
        const response = await axios.get(`https://api.thelearnskills.com/api/v1/college/colleges/${_id}`);
        setCollege(response.data);
      } catch (error) {
        setError('Error fetching college details');
        console.error('Error fetching college details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollegeDetails();
  }, [_id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ color: 'red', textAlign: 'center' }}>
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  if (!college) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6">No college data found</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: '2rem',
        backgroundColor: '#fff',
        marginBottom: '2rem',
        border: '1px solid',
        borderColor: '#ccc',
        borderRadius: '4px',
        marginTop: '2rem',
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        College Info
      </Typography>
      <Typography variant="body1">
        {college.aboutCollege || 'No information available about the college.'}
      </Typography>
    </Box>
  );
};

export default CollegeInfo;
