import React, { useState } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import CourseCard from './VocationCard';
import Navbar from '../header/Navbar';
import Filters from './VocationalFilter'; // Import the Filters component
import { styled } from '@mui/system';
import Footer from '../footer/Footer'

const Banner = styled(Box)(({ theme }) => ({
  background: '#003285',
  color: 'white',
  textAlign: 'center',
  padding: theme.spacing(20, 0),
}));

const courses = [
  {
    id: 1,
    title: 'Supply Chain Prodigy Certificate',
    description: 'The training approach will be highly interactive taking advantage of the technological benefits. The pedagogy followed for the programme will be a judicious blend of lectures, case studies and participants experience sharing.',
    price: 'medium',
    duration: 'medium',
    topic: 'management',
    image: 'https://cdn.elearningindustry.com/wp-content/uploads/2022/02/shutterstock_1112381495.jpg',
  },
  // Add more courses with relevant properties
];

const VocationalEducation = () => {
  const [filters, setFilters] = useState({
    price: '',
    duration: '',
    topic: ''
  });

  // Filter courses based on the selected filters
  const filteredCourses = courses.filter(course => {
    return (
      (filters.price === '' || course.price === filters.price) &&
      (filters.duration === '' || course.duration === filters.duration) &&
      (filters.topic === '' || course.topic === filters.topic)
    );
  });

  return (
    <Box>
      <Navbar />
      <Banner marginBottom ="3rem">
        <Typography variant="h4" fontWeight="bold">Vocational Training and Programs</Typography>
        <Typography variant="h5" fontWeight="bold">"Empowering Careers through industry-relevant Training Programs"</Typography>
      </Banner>
      <Container >
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={3} >
            <Filters filters={filters} setFilters={setFilters} marginTop="12rem" /> {/* Sidebar for filters */}
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Grid container spacing={3}>
              {filteredCourses.map((course, index) => (
                <Grid item xs={12} sm={6} md={5} key={index}>
                  <CourseCard course={course} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer/>
    </Box>
  );
};

export default VocationalEducation;
