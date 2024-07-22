import React from 'react';
import { Box, Typography } from '@mui/material';

const CollegeInfo = ({ overview }) => {
  return (
    <Box
      sx={{
        padding: '2rem',
        backgroundColor: '#fff',
        marginBottom: '2rem',
        border: '1px solid',
        borderColor: '#ccc',
        borderRadius: '4px',
        marginTop:'2rem',
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        College Info
      </Typography>
      <Typography variant="body1">{overview}</Typography>
    </Box>
  );
};

export default CollegeInfo;
