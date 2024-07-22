// src/components/VocationalEducation.js
import React from 'react';
import { Container, Grid, Typography,Box } from '@mui/material';
import CourseCard from './VocationCard';
import Navbar from '../header/Navbar';
import { styled } from '@mui/system';



const Banner = styled(Box)(({ theme }) => ({
    background: '#003285',
    color: 'white',
    textAlign: 'center',
    padding: theme.spacing(20, 0),
  }));
const courses = [
  {
    title: 'Course 1',
    description: 'Description for Course 1',
    price: 1000,
    image: 'https://cdn.elearningindustry.com/wp-content/uploads/2022/02/shutterstock_1112381495.jpg',
  },
  {
    title: 'Course 2',
    description: 'Description for Course 2',
    price: 1500,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbEuQpS76S_G37Y36qnR-fS46GHOrnglBAjA&s',
  },
  {
    title: 'Course 3',
    description: 'Description for Course 3',
    price: 2000,
    image: 'https://instructor-academy.onlinecoursehost.com/content/images/2023/05/101_-What-Online-Courses-Are-Most-In-Demand-In-2023_.jpg',
  },
  {
    title: 'Course 4',
    description: 'Description for Course 4',
    price: 2500,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3yUxotsxzZksPzUinHOtBE9CkscIVrY7g7A&s',
  },
  {
    title: 'Course 5',
    description: 'Description for Course 5',
    price: 3000,
    image: 'https://yellowtail.tech/wp-content/uploads/2021/11/Best-IT-Courses-Online-for-Beginners-from-Yellow-Tail-Tech-Web-of-IT.png.webp',
  },
  {
    title: 'Course 6',
    description: 'Description for Course 6',
    price: 3500,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgtpPZbG2BUS5k7MQPR45exsq5r7CDnwugmA&s',
  },
];

const VocationalEducation = () => {
  return (
    <Box>
        <Navbar/>
        <Banner>
        <Typography variant="h3" fontWeight="bold">Vocational Training and Programs</Typography>
        <Typography variant="h4" fontWeight='bold'>"Empowering Carrer through industry relvent Training Programs"</Typography>
        {/* <Button variant="contained" color="secondary" sx={{ marginTop: 2 }} onClick={handleExploreClick}>
          Explore Internships
        </Button> */}
        
      </Banner>
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        Vocational Education
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Container>
    </Box>
  );
};

export default VocationalEducation;
