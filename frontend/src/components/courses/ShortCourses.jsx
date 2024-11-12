import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios'; // Import Axios
import CourseCategory from './CourseCategory';
import Filters from './CoursesFilter'; // Import Filters component
import { Container, Typography, Box, Grid, CircularProgress } from '@mui/material';
import Footer from '../footer/Footer';
import Navbar from '../header/Navbar';

const exchangeRate = 74; // Example exchange rate from USD to INR
const convertToINR = (price) => price * exchangeRate;

function CoursesPage({ type }) {
  const [courses, setCourses] = useState([]); // Single list for all courses
  const [priceRange, setPriceRange] = useState([0, 2000 * exchangeRate]);
  const [durationRange, setDurationRange] = useState([0, 2]); // Focus only on short-term courses
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://api.thelearnskills.com/api/v1/shortTermcourse/short-term-courses', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log('Fetched Courses:', response.data);
  
        const fetchedCourses = response.data.map((course) => ({
          ...course,
          price: convertToINR(course.price), // Convert price to INR
        }));
  
        setCourses(fetchedCourses); // Set all courses
        console.log('Fetched Courses after conversion:', fetchedCourses); // Check values after conversion
      } catch (err) {
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);
  

  const filteredCourses = useMemo(() => {
    return courses; // No filtering, just returning all courses
  }, [courses]);
  
  console.log('All Courses:', filteredCourses);
  

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography variant="h6" color="error" align="center">{error}</Typography>;
  }

  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      <Navbar />
      <Box
        sx={{
          width: '100%',
          height: { xs: 'auto', sm: '200px' },
          backgroundColor: '#003285',
          color: 'white',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            textAlign: { xs: 'center', sm: 'center' },
            fontSize: { xs: '1.5rem', sm: '2rem' },
            marginRight: { sm: '0', xs: '2rem' },
            marginBottom: { xs: 2, sm: 0 },
          }}
        >
          "Unlock Your Potential with Our Expert-Led Courses"
        </Typography>
        <dotlottie-player
          src="https://lottie.host/e4ce24ca-5108-4fe5-bd85-e25096f4125a/bDuRIjyOdk.json"
          background="transparent"
          speed="1"
          loop
          autoplay
          style={{
            width: '300px',
            height: '300px',
            marginLeft: { xs: 0, sm: '15rem' },
            display: { xs: 'none', sm: 'block' },
          }}
        ></dotlottie-player>
      </Box>
      <Container>
        <Typography
          variant="h4"
          gutterBottom
          marginTop="2rem"
          marginRight="25rem"
          fontWeight="bold"
          textAlign="center"
        >
          All Courses
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={3}>
            <Filters
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              durationRange={durationRange}
              setDurationRange={setDurationRange}
              type={type} // pass the type to Filters component
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <CourseCategory courses={filteredCourses} /> {/* Display all filtered courses */}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}

export default CoursesPage;
