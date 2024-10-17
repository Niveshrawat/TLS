import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button, Grid, Container, CircularProgress, Alert } from '@mui/material';
import CollegeCard from './CollegeCard';

const CollegesSlider = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`https://api.thelearnskills.com/api/v1/vocationalEducation/vocational-education`); // Use environment variables for API URLs
        console.log('Fetched Courses:', response.data);
        setCourses(response.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err.response ? `${err.response.status}: ${err.response.statusText}` : err.message); // Improved error message
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ ml: 2 }}>Loading colleges...</Typography> {/* Added a message next to the loader */}
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">Failed to load colleges: {error}</Alert> {/* Improved error message */}
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, mt: 10 }}>
        <Typography variant="h4" fontWeight="bold">Career Courses</Typography>
        <Button variant="contained" component={Link} to="/vocational-education">View All Courses</Button>
      </Box>
      <Grid container spacing={4}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course._id || course.name}> {/* Use course._id as the primary key */}
            <CollegeCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CollegesSlider;
