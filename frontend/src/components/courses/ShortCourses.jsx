import React, { useState, useMemo } from 'react';
import CourseCategory from './CourseCategory';
import Filters from './CoursesFilter'; // Import Filters component
import { Container, Typography, Box, Grid } from '@mui/material';
import Footer from '../footer/Footer';
import Navbar from '../header/Navbar';

const exchangeRate = 74; // Example exchange rate from USD to INR
const convertToINR = (price) => price * exchangeRate;

const shortTermCourses = {
  financial: [
    { id: 1, title: 'Short Term Financial Course 1', image: 'https://images.pexels.com/photos/12425927/pexels-photo-12425927.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 1', price: "10000", duration: '1 month', rating: 4.5 },
    { id: 2, title: 'Short Term Financial Course 2', image: 'https://images.pexels.com/photos/3182755/pexels-photo-3182755.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 2', price: "7000", duration: '1.5 months', rating: 4.0 },
    { id: 3, title: 'Short Term Financial Course 3', image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 3', price: "5000", duration: '2 months', rating: 4.8 },
  ],
  technology: [
   
  ],
  management: [
   
  ],
};

const longTermCourses = {
  financial: [
    { id: 10, title: 'Long Term Financial Course 1', image: 'https://images.pexels.com/photos/3184290/pexels-photo-3184290.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 10', price: convertToINR(700), duration: '3 months', rating: 4.6 },
    { id: 11, title: 'Long Term Financial Course 2', image: 'https://images.pexels.com/photos/3184289/pexels-photo-3184289.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 11', price: convertToINR(800), duration: '4 months', rating: 4.7 },
    { id: 12, title: 'Long Term Financial Course 3', image: 'https://images.pexels.com/photos/3184288/pexels-photo-3184288.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 12', price: convertToINR(900), duration: '5 months', rating: 4.8 },
  ],
  technology: [
    { id: 13, title: 'Long Term Tech Course 1', image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 13', price: convertToINR(1000), duration: '6 months', rating: 4.5 },
    { id: 14, title: 'Long Term Tech Course 2', image: 'https://images.pexels.com/photos/3184286/pexels-photo-3184286.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 14', price: convertToINR(1100), duration: '5 months', rating: 4.6 },
    { id: 15, title: 'Long Term Tech Course 3', image: 'https://images.pexels.com/photos/3184285/pexels-photo-3184285.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 15', price: convertToINR(1200), duration: '4 months', rating: 4.7 },
  ],
  management: [
    { id: 16, title: 'Long Term Management Course 1', image: 'https://images.pexels.com/photos/3184284/pexels-photo-3184284.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 16', price: convertToINR(1300), duration: '6 months', rating: 4.8 },
    { id: 17, title: 'Long Term Management Course 2', image: 'https://images.pexels.com/photos/3184283/pexels-photo-3184283.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 17', price: convertToINR(1400), duration: '5 months', rating: 4.9 },
    { id: 18, title: 'Long Term Management Course 3', image: 'https://images.pexels.com/photos/3184282/pexels-photo-3184282.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 18', price: convertToINR(1500), duration: '4 months', rating: 5.0 },
  ],
};

function CoursesPage({ type }) {
  const [priceRange, setPriceRange] = useState([0, 2000 * exchangeRate]);
  const [durationRange, setDurationRange] = useState(type === 'short' ? [0, 2] : [2, 6]);
  const courses = type === 'short' ? shortTermCourses : longTermCourses;

  const filteredCourses = useMemo(() => {
    const filterCourses = (courses) =>
      courses.filter(
        (course) =>
          course.price >= priceRange[0] &&
          course.price <= priceRange[1] &&
          parseFloat(course.duration) >= durationRange[0] &&
          parseFloat(course.duration) <= durationRange[1]
      );

    return {
      financial: filterCourses(courses.financial),
      technology: filterCourses(courses.technology),
      management: filterCourses(courses.management),
    };
  }, [priceRange, durationRange, courses]);

  return (
    <Box sx={{width: '100%', overflowX: 'hidden'}}>
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
        <Typography variant="h4" sx={{ 
            color: 'white',
            fontWeight: 'bold',
            textAlign: { xs: 'center', sm: 'center' },
            fontSize: { xs: '1.5rem', sm: '2rem' },
            
            marginRight:{sm:'0',xs:'2rem' },
            marginBottom: { xs: 2, sm: 0 },
           }}>
          "Unlock Your Potential with Our Expert-Led Courses"
        </Typography>
        <dotlottie-player
          src="https://lottie.host/e4ce24ca-5108-4fe5-bd85-e25096f4125a/bDuRIjyOdk.json"
          background="transparent"
          speed="1"
          loop
          autoplay
          style={{ width: '300px', height: '300px', marginLeft: { xs: 0, sm: '15rem' }, display: { xs: 'none', sm: 'block' } }}
          ></dotlottie-player>
      </Box>
      <Container>
        <Typography variant="h4" gutterBottom marginTop="2rem" marginRight="25rem" fontWeight="bold" textAlign="center">
          {type === 'short' ? 'All Courses' : 'Long Term Courses'}
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
            <CourseCategory  courses={filteredCourses.financial} />
            {/* <CourseCategory title="Technology Courses" courses={filteredCourses.technology} />
            <CourseCategory title="Management Courses" courses={filteredCourses.management} /> */}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}

export default CoursesPage;
