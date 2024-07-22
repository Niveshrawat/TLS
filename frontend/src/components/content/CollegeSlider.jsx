// CollegesSlider.js
import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Typography, Button, Grid, Container } from '@mui/material';
import CollegeCard from './CollegeCard';

const colleges = [
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6iRHWeeWnBzH6iWXr4SrQ9Hlxal_nSOrdaA&s',
    name: 'College 1',
    description: 'Description of College 1',
    courses: ['Course A', 'Course B', 'Course C'],
    fees: '$1000/year',
  },
  {
    image: 'https://images.shiksha.com/mediadata/images/articles/1693247327php9Ixvyk.jpeg',
    name: 'College 2',
    description: 'Description of College 2',
    courses: ['Course D', 'Course E', 'Course F'],
    fees: '$2000/year',
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz0KLXQCo48J77GbsxUGir3DkRV6tP_GxTNw&s',
    name: 'College 3',
    description: 'Description of College 3',
    courses: ['Course G', 'Course H', 'Course I'],
    fees: '$3000/year',
  },
  // {
  //   image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201806/du-650_060114055506_0.jpeg?size=690:388',
  //   name: 'College 4',
  //   description: 'Description of College 4',
  //   courses: ['Course J', 'Course K', 'Course L'],
  //   fees: '$4000/year',
  // },
  // {
  //   image: 'https://media.geeksforgeeks.org/wp-content/uploads/20231207140511/DU-Colleges-copy-6.webp',
  //   name: 'College 5',
  //   description: 'Description of College 5',
  //   courses: ['Course M', 'Course N', 'Course O'],
  //   fees: '$5000/year',
  // },
];

const CollegesSlider = () => {
  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, mt:10 }}>
        <Typography variant="h4" fontWeight='bold'>Colleges</Typography>
        <Button variant="contained" component={Link} to="/underGraduate">View All Colleges</Button>
      </Box>
      <Grid container spacing={4}>
        {colleges.map((college, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CollegeCard {...college} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CollegesSlider;
