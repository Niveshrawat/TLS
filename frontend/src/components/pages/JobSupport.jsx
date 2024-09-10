import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import Navbar from '../header/Navbar';
import Footer from '../footer/Footer';
import { alignProperty } from '@mui/material/styles/cssUtils';

const JobSupport = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Ensure the box takes at least the full height of the viewport
      }}
    >
      <Navbar />
      <Container
        sx={{
          flex: 1, // Push the footer to the bottom
        }}
      >
        {/* <Typography variant="h3">
          Enterprise and Skills
        </Typography> */}
        
        <dotlottie-player
          src="https://lottie.host/667e68b3-fc61-4475-803e-8fd57a68dad4/ovdtx1OPIu.json"
          background="transparent"
          speed="1"
          loop
          autoplay
            style={{width: "400px", height: "400px", alignItems:'center', marginLeft:'28rem'}}
        ></dotlottie-player>

        <Typography variant="h4" textAlign="center" fontWeight="bold" marginBottom="3rem">Coming Soon</Typography>

    {/* <dotlottie-player src="https://lottie.host/667e68b3-fc61-4475-803e-8fd57a68dad4/ovdtx1OPIu.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></dotlottie-player> */}
      </Container>
      <Footer />
    </Box>
  );
};

export default JobSupport;
