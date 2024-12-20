import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  CircularProgress,
  Alert,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CollegeCard from './CollegeCard';

const CollegesSlider = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visibleStart, setVisibleStart] = useState(0);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const visibleCount = isSmallScreen ? 1 : isMediumScreen ? 2 : 3;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `https://api.thelearnskills.com/api/v1/vocationalEducation/vocational-education`
        );
        console.log('Fetched Courses:', response.data);
        setCourses(response.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err.response ? `${err.response.status}: ${err.response.statusText}` : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleNext = () => {
    if (visibleStart + visibleCount < courses.length) {
      setVisibleStart((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (visibleStart > 0) {
      setVisibleStart((prev) => prev - 1);
    }
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ ml: 2 }}>Loading colleges...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">Failed to load colleges: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, mt: 10 }}>
        <Typography variant="h4" fontWeight="bold">Vocational Courses</Typography>
        <Button variant="contained" component={Link} to="/vocational-education">View All Courses</Button>
      </Box>
      <Box sx={{ position: 'relative' }}>
        <IconButton
          sx={{
            position: 'absolute',
            top: '50%',
            left: { xs: -22, sm: -40 }, // Adjust position for small screens
            transform: 'translateY(-50%)',
            zIndex: 1,
            backgroundColor:{ xs:"lightgrey"}
          }}
          onClick={handlePrev}
          disabled={visibleStart === 0}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <Grid container spacing={2}>
          {courses.slice(visibleStart, visibleStart + visibleCount).map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course._id || course.name}>
              <CollegeCard course={course} />
            </Grid>
          ))}
        </Grid>
        <IconButton
          sx={{
            position: 'absolute',
            top: '50%',
            right: { xs: -22, sm: -40 }, // Adjust position for small screens
            transform: 'translateY(-50%)',
            zIndex: 1,
            backgroundColor:{ xs:"lightgrey"}
          }}
          onClick={handleNext}
          disabled={visibleStart + visibleCount >= courses.length}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Container>
  );
};

export default CollegesSlider;
