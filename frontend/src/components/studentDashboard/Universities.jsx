// src/components/Universities.js
import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const Universities = () => {
  const appliedColleges = []; // This should be dynamically fetched based on the user's data

  return (
    <Box p={3}>
      <Typography variant="h5">Universities</Typography>
      {appliedColleges.length > 0 ? (
        <Box mt={2}>
          {appliedColleges.map((college, index) => (
            <Typography key={index} variant="body1">{college.name}</Typography>
          ))}
        </Box>
      ) : (
        <Box mt={2} textAlign="center" marginTop="5rem">
          <Typography variant="body1" marginBottom="1rem" fontWeight="bold">No Colleges Available</Typography>
          <Typography variant="body2" marginBottom="1rem">
            You have not enrolled any college yet. Please click on explore colleges to learn more.
          </Typography>
          <Button variant="contained" color="primary" mt={2}>Explore Colleges</Button>
        </Box>
      )}
    </Box>
  );
};

export default Universities;
