import React from 'react';
import { Box } from '@mui/material';
import PostGraduateCard from './PostGraduateCard';

const CollegeList = ({ colleges }) => {
  return (
    <Box>
      {colleges.map((college) => (
        <PostGraduateCard key={college.id} college={college} />
      ))}
    </Box>
  );
};

export default CollegeList;
