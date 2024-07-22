import React from 'react';
import { Box, Grid } from '@mui/material';
import UnderGraduateCard from './UnderGraduateCard';

const CollegeList = ({ colleges }) => {
  return (
    <Grid container spacing={4}>
      {colleges.map((college) => (
        <Grid item xs={12} sm={6} md={4} key={college.id}>
          <UnderGraduateCard college={college} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CollegeList;
