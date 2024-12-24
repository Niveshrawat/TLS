import React from 'react';
import {  CssBaseline,Box, Container,Typography } from '@mui/material';
import Navbar from './header/Navbar';
import Footer from './footer/Footer';
// import CoursesGrid from './content/CoursesGrid';
import CollegesSlider from './content/CollegeSlider';
import BenefitSection from './content/Content';
import Header from './header/Header';
// import Partners from './header/Partners';
import Boxes from './header/Boxes'
import Testimonials from './content/Testimonial';
import CoursesGrid from './content/CoursesGrid';
import JobSlider from './content/JobSlider';

const MainLayout = () => {
  return (
    <main style={{ fontFamily: "'Noto Serif', serif" }}>
      <Navbar />
     <Header/>
      {/* <Partners/> */}
      
      <Box sx={{ width: '100%', backgroundColor: 'white', minHeight: '100vh', py: 8 }}>
        <CssBaseline />
        <CollegesSlider />
        <CoursesGrid />
      </Box>
      
      <Boxes/>
      <Box sx={{ marginTop:'3rem', width: '100%', minHeight: '50vh' }}>
        <CssBaseline />
        <JobSlider/>
      </Box>
      <Box>
      <CssBaseline />
      <Container>
        
        <Testimonials />
      </Container>

        </Box>
        <Box
  sx={{
    marginTop: '2rem',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem',
  }}
>
<Box
  sx={{
    width: {
      xs: '15rem',
      sm: '24rem',
      md: '30rem',
      lg: '40rem',
    },
    height: {
      xs: '10rem',
      sm: '16rem',
      md: '20rem',
      lg: '30rem',
    },
    backgroundImage: `url(/images/Certificate.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
/>
</Box>



      <Footer />
    </main>
  );
};

export default MainLayout;
