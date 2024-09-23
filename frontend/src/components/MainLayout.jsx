import React from 'react';
import {  CssBaseline,Box, Container,Typography } from '@mui/material';
import Navbar from './header/Navbar';
import Footer from './footer/Footer';
// import CoursesGrid from './content/CoursesGrid';
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
      
      <Box sx={{ width: '100%', backgroundColor: 'white', minHeight: '50vh', py: 8 }}>
        <CssBaseline />
        {/* <CoursesGrid /> */}
        <CollegesSlider />
      </Box>
      <Boxes/>
      <Box sx={{ marginTop:'3rem', width: '100%', minHeight: '50vh' }}>
        <CssBaseline />
        <BenefitSection />
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
    component="img"
    src="/images/Certificate.jpg"
    sx={{
      width: {
        xs: '15rem', // Width for extra small screens (phones)
        sm: '24rem', // Width for small screens (tablets)
        md: '30rem', // Width for medium screens (small laptops)
        lg: '40rem', // Width for large screens (desktops)
      },
      height: {
        xs: '10rem', // Height for extra small screens (phones)
        sm: '16rem', // Height for small screens (tablets)
        md: '20rem', // Height for medium screens (small laptops)
        lg: '30rem', // Height for large screens (desktops)
      },
      marginRight:{
        xs: '3rem', // Height for extra small screens (phones)

      }
    }}
  />
</Box>



      <Footer />
    </main>
  );
};

export default MainLayout;
