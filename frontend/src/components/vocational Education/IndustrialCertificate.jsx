import React, { useState } from 'react';
import { Container, Grid, Typography, Box, Button } from '@mui/material';
import CourseCard from './VocationCard';
import Navbar from '../header/Navbar';
import Filters from './VocationalFilter'; // Import the Filters component
import { styled } from '@mui/system';
import Footer from '../footer/Footer';

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
    description: 'The training approach will be highly interactive taking advantage of the technological benefits.',
    price: 'medium',
    duration: 'medium',
    topic: 'management',
    image: '/public/images/SupplyChain.jpg',
    category: 'industrial' // Add category for filtering
  },
  // Add more courses with relevant properties
];

const VocationalEducation = () => {
  const [filters, setFilters] = useState({
    price: '',
    duration: '',
    topic: ''
  });
  
  const [tabValue, setTabValue] = useState('all'); // State for tab selection

  // Filter courses based on the selected filters and tab
  const filteredCourses = courses.filter(course => {
    return (
      (tabValue === 'all' || course.category === tabValue) &&
      (filters.price === '' || course.price === filters.price) &&
      (filters.duration === '' || course.duration === filters.duration) &&
      (filters.topic === '' || course.topic === filters.topic)
    );
  });

  const handleTabChange = (value) => {
    setTabValue(value); // Change tab value
  };

  return (
    <Box>
      <Navbar />
      <Banner marginBottom="3rem">
        <Typography variant="h4" fontWeight="bold">Vocational Training and Programs</Typography>
        <Typography variant="h5" fontWeight="bold">"Empowering Careers through industry-relevant Training Programs"</Typography>
      </Banner>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={3}>
            <Filters filters={filters} setFilters={setFilters} marginTop="12rem" /> {/* Sidebar for filters */}
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Box display={{ xs: 'flex', sm: 'none' }} justifyContent="center" mb={2}>
              <Button
                variant={tabValue === 'all' ? 'contained' : 'outlined'}
                onClick={() => handleTabChange('all')}
                sx={{ margin: 1, width:'5rem', height:'15rem' }}
              >
                All Courses
              </Button>
              <Button
                variant={tabValue === 'industrial' ? 'contained' : 'outlined'}
                onClick={() => handleTabChange('industrial')}
                style={{ margin: 1, height:'4rem' }}
              >
                Industrial Certificate Courses
              </Button>
              <Button
                variant={tabValue === 'corporate' ? 'contained' : 'outlined'}
                onClick={() => handleTabChange('corporate')}
                sx={{ margin: 1 }}
              >
                Corporate Blend Certificate Courses
              </Button>
            </Box>
            <Box display={{ xs: 'none', sm: 'flex' }} justifyContent="center" mb={{xs:'2', sm:'0'}} mt={{xs:'0', sm:-4}} ml={{xs:0, sm: -10}}>
              <Button
                variant={tabValue === 'all' ? 'contained' : 'outlined'}
                color="error"
                onClick={() => handleTabChange('all')}
                style={{ margin: 2 }}
              >
                All Courses
              </Button>
              <Button
                variant={tabValue === 'industrial' ? 'contained' : 'outlined'}
                color="error"
                margin="2rem"
                onClick={() => handleTabChange('industrial')}
                style={{ margin: 2,  }}
              >
                Industrial Certificate Courses
              </Button>
              <Button
                variant={tabValue === 'corporate' ? 'contained' : 'outlined'}
                color="error"
                
                onClick={() => handleTabChange('corporate')}
                style={{ margin: 2,  }}
              >
                Corporate Blend Certificate Courses
              </Button>
            </Box>
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
      <Footer />
    </Box>
  );
};

export default VocationalEducation;
