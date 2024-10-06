import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Box, Button,CircularProgress } from '@mui/material';
import CourseCard from './VocationCard'; // Ensure this is the correct component name
import Navbar from '../header/Navbar';
import Filters from './VocationalFilter';
import { styled } from '@mui/system';
import Footer from '../footer/Footer';
import axios from 'axios';

const Banner = styled(Box)(({ theme }) => ({
  background: '#003285',
  color: 'white',
  textAlign: 'center',
  padding: theme.spacing(20, 0),
}));

const VocationalEducation = () => {
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({
    price: '',
    duration: '',
    topic: '',
  });
  const [tabValue, setTabValue] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courses from the backend API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://api.thelearnskills.com/api/v1/vocationalEducation/vocational-education');
        console.log('Fetched Courses:', response.data);
        setCourses(response.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCourses();
  }, []);

  // Filter courses based on the selected filters and tab
  const filteredCourses = courses.filter((course) => {
    return (
      (tabValue === 'all' || course.category === tabValue) &&
      (filters.price === '' || course.price === filters.price) &&
      (filters.duration === '' || course.duration === filters.duration) &&
      (filters.topic === '' || course.topic === filters.topic)
    );
  });

  const handleTabChange = (value) => {
    setTabValue(value);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"  // Full page height
      >
        <CircularProgress />
        <Typography variant="h4" sx={{ ml: 2 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return <Typography variant="h4">Error: {error}</Typography>;
  }

  return (
    <Box>
    <Navbar />
    <Banner marginBottom="3rem">
      <Typography variant="h4" fontWeight="bold">
        Vocational Training and Programs
      </Typography>
      <Typography variant="h5" fontWeight="bold">
        "Empowering Careers through industry-relevant Training Programs"
      </Typography>
    </Banner>
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={3}>
          <Filters filters={filters} setFilters={setFilters} marginTop="12rem" /> {/* Sidebar for filters */}
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          {/* Mobile View: Buttons stacked vertically */}
          <Box
            display={{ xs: 'flex', sm: 'none' }}
            justifyContent="center"
            flexDirection="column"
            mb={2}
          >
            <Button
              variant={tabValue === 'all' ? 'contained' : 'outlined'}
              size="large"
              fullWidth
              sx={{ mb: 2 }} // Margin between buttons
              onClick={() => handleTabChange('all')}
            >
              All Courses
            </Button>
            <Button
              variant={tabValue === 'industrial' ? 'contained' : 'outlined'}
              size="large"
              fullWidth
              sx={{ mb: 2 }}
              onClick={() => handleTabChange('industrial')}
            >
              Industrial Certificate Courses
            </Button>
            <Button
              variant={tabValue === 'corporate' ? 'contained' : 'outlined'}
              size="large"
              fullWidth
              sx={{ mb: 2 }}
              onClick={() => handleTabChange('corporate')}
            >
              Corporate Blend Certificate Courses
            </Button>
          </Box>

          {/* Tablet and Laptop View: Buttons aligned horizontally with spacing */}
          <Box
            display={{ xs: 'none', sm: 'flex' }}
            justifyContent="center"
            mb={3}
            mt={{ xs: '0', sm: -4 }}
          >
            <Button
              variant={tabValue === 'all' ? 'contained' : 'outlined'}
              size="large"
              sx={{ mx: 1.5, my:1 }} // Horizontal margin between buttons
              onClick={() => handleTabChange('all')}
            >
              All Courses
            </Button>
            <Button
              variant={tabValue === 'industrial' ? 'contained' : 'outlined'}
              size="large"
              sx={{ mx: 1.5, my:1 }}
              onClick={() => handleTabChange('industrial')}
            >
              Industrial Certificate Courses
            </Button>
            <Button
              variant={tabValue === 'corporate' ? 'contained' : 'outlined'}
              size="large"
              sx={{ mx: 1.5, my:1 }}
              onClick={() => handleTabChange('corporate')}
            >
              Corporate Blend Certificate Courses
            </Button>
          </Box>

          <Grid container spacing={3}>
            {filteredCourses.map((course, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
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
