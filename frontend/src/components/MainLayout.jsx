import React from 'react';
import {  CssBaseline,Box, Container,Typography } from '@mui/material';
import Navbar from './header/Navbar';
import Footer from './footer/Footer';
import CoursesGrid from './content/CoursesGrid';
import CollegesSlider from './content/CollegeSlider';
import BenefitSection from './content/Content';
import Header from './header/Header';
import Partners from './header/Partners';
import Boxes from './header/Boxes'
import Testimonials from './content/Testimonial';

const MainLayout = () => {
  return (
    <main style={{ fontFamily: "'Noto Serif', serif" }}>
      <Navbar />
     <Header/>
      <Partners/>
      <Boxes/>
      <Box sx={{ marginTop:'3rem', width: '100%', minHeight: '50vh' }}>
        <CssBaseline />
        <BenefitSection />
      </Box>
      <Box sx={{ width: '100%', backgroundColor: 'white', minHeight: '50vh', py: 8 }}>
        <CssBaseline />
        {/* <CoursesGrid /> */}
        <CollegesSlider />
      </Box>
      <Box>
      <CssBaseline />
      <Container>
        
        <Testimonials />
      </Container>
        </Box>
      <Footer />
    </main>
  );
};

export default MainLayout;
