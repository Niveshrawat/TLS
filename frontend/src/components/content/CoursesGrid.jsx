import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import { Box, Typography, Button, Container, CircularProgress, Alert, IconButton } from '@mui/material';
import CourseCard from './CourseCard';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CoursesGrid = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`https://api.thelearnskills.com/api/v1/shortTermcourse/short-term-courses`);
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

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ ml: 2 }}>Loading courses...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">Failed to load courses: {error}</Alert>
      </Container>
    );
  }

  const CustomArrow = ({ direction, onClick }) => (
    <IconButton
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: { xs: 30, sm: 40 },
        height: { xs: 30, sm: 40 },
        backgroundColor: 'white',
        border: '1px solid lightgray',
        borderRadius: '50%',
        position: 'absolute',
        zIndex: 2,
        top: '50%',
        transform: 'translateY(-50%)',
        right: direction === 'next' ? { xs: -25, sm: -40 } : 'auto',
        left: direction === 'prev' ? { xs: -25, sm: -40 } : 'auto',
        cursor: 'pointer',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      onClick={onClick}
    >
      {direction === 'next' ? <ArrowForwardIos fontSize="small" /> : <ArrowBackIos fontSize="small" />}
    </IconButton>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', sm: 'space-between' },
          alignItems: 'center',
          mb: 4,
          mt: 10,
          flexDirection: { xs: 'column', sm: 'row' },
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ mb: { xs: 2, sm: 0 } }}>
          Short Term Courses
        </Typography>
        <Button variant="contained" component={Link} to="/all-courses">
          View All Courses
        </Button>
      </Box>
      <Slider {...settings}>
        {courses.map((course) => (
          <Box key={course._id || course.name} sx={{ px: 2, height: '100%' }}>
            <CourseCard course={course} />
          </Box>
        ))}
      </Slider>
    </Container>
  );
};

export default CoursesGrid;
