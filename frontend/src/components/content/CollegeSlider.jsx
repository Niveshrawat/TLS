// CollegesSlider.js
import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Typography, Button, Grid, Container } from '@mui/material';
import CollegeCard from './CollegeCard';

const courses = [
  {
    id:'1',
    image: '/images/SupplyChain.jpg',
    name: 'Supply Chain Prodigy Certificate',
    description: 'The training approach will be highly interactive taking advantage of the technological benefits.',
    duration: '2months',
  },
  {
    id:'2',
    image: '/images/logic.jpg',
    name: 'Certificate in Logistics & Warehousing Operations (CLWO)',
    description: 'This program is designed to provide comprehensive training in logistics and warehousing operations, equipping...',
    duration: '21 Days + 1 Month OJT',

  },
  {
    id:'3',
    image: '/images/communication.jpg',
    name: 'Professional English Communication Course',
    description: 'The Professional English Communication for the Workplace course is designed to enhance your English speaking, listening, and writing skills,...',
    duration: '1.5 Month',
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
        <Typography variant="h4" fontWeight='bold'>Courses</Typography>
        <Button variant="contained" component={Link} to="/vocational-education">View All Courses</Button>
      </Box>
      <Grid container spacing={4}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CollegeCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CollegesSlider;
