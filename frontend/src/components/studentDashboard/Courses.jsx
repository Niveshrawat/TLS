// src/components/Courses.js
import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const Courses = () => {
  const enrolledCourses = []; // This should be dynamically fetched based on the user's data

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold">Courses</Typography>
      {enrolledCourses.length > 0 ? (
        <Box mt={2}>
          {enrolledCourses.map((course, index) => (
            <Typography key={index} variant="body1">{course.name}</Typography>
          ))}
        </Box>
      ) : (
        <Box mt={2} textAlign="center" marginTop="5rem">
          <Typography variant="body1" marginBottom="1rem" fontWeight="bold">No Courses Available</Typography>
          <Typography variant="body2" marginBottom="1rem">
            You have not enrolled in any course yet. Please click on explore courses to learn more.
          </Typography>
          <Button variant="contained" color="primary" mt={2}>Explore Courses</Button>
        </Box>
      )}
    </Box>
  );
};

export default Courses;
