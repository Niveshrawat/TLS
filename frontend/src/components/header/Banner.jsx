// src/components/Banner.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Banner = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '300px',
        backgroundColor: '#333f59', // Replace with your image URL
        color:'white',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h2" sx={{ color: 'white' }}>
        Welcome to Our College
      </Typography>
    </Box>
  );
};

export default Banner;
