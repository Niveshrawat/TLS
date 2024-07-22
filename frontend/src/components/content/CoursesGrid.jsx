// CoursesGrid.js
import React from 'react';
import { Grid, Box, Typography, Button, Container } from '@mui/material';
import CourseCard from './CourseCard';

const courses = [
  {
    image: 'https://www.wemakescholars.com/uploads/blog/TopprofessionalITcoursetopursueincollege.jpg',
    title: 'Course 1',
    description: 'Description of Course 1',
    price: '$100',
    audience: 'Professionals',
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlnSRf5gTB_HVJwAyKmpoVW2ujh0yk6Xh82A&s',
    title: 'Course 2',
    description: 'Description of Course 2',
    price: '$200',
    audience: 'Students',
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6wLvUAam9_Tp4EeaEFZz6VMYYi607i1f2kA&s',
    title: 'Course 3',
    description: 'Description of Course 3',
    price: '$300',
    audience: 'Beginners',
  },
  // {
  //   image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3yUxotsxzZksPzUinHOtBE9CkscIVrY7g7A&s',
  //   title: 'Course 4',
  //   description: 'Description of Course 4',
  //   price: '$400',
  //   audience: 'Experts',
  // },
  // {
  //   image: 'https://images.shiksha.com/mediadata/ugcDocuments/images/wordpressImages/2020_05_software-development-i1.jpg',
  //   title: 'Course 5',
  //   description: 'Description of Course 5',
  //   price: '$500',
  //   audience: 'Intermediate',
  // },
  // {
  //   image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfuX-TF__YzOjG-FEt00-IOmEG0OnXSVHM-A&s',
  //   title: 'Course 6',
  //   description: 'Description of Course 6',
  //   price: '$600',
  //   audience: 'Advanced',
  // },
];

const CoursesGrid = () => {
  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Courses</Typography>
        <Button variant="contained" href="/all-courses">View All Courses</Button>
      </Box>
      <Grid container spacing={4}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CourseCard {...course} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CoursesGrid;
