import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import Navbar from '../header/Navbar';
import Footer from '../footer/Footer'

const Contact = () => {
  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          p: { xs: 3, md: 10 },
          paddingLeft: { xs: 3, md: 30 },
        }}
      >
        <Box
          sx={{
            flexBasis: { xs: '100%', md: '30%' },
            display: 'flex',
            justifyContent: { xs: 'center', md: 'flex-start' },
            marginBottom: { xs: 3, md: 0 },
          }}
        >
          <dotlottie-player
            src="https://lottie.host/f785e77b-03a3-4523-b772-4f18636e2830/lcm3N1YjUq.json"
            background="transparent"
            speed="1"
            style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
            loop
            autoplay
          ></dotlottie-player>
        </Box>

        <Box
          sx={{
            flexBasis: { xs: '100%', md: '65%' },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h4" component="h2" sx={{ mb: 2, fontWeight:'bold' }}>
            Contact Us
          </Typography>

          {/* Contact Form */}
          <form>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              
              {/* Name and Email on the same line */}
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <TextField
                  label="Name"
                  variant="outlined"
                  required
                  sx={{
                    border: "none",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "6px",
                    marginBottom: "10px",
                    width: '100%',
                    maxWidth: '31rem'
                  }}
                />
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  required
                  sx={{
                    border: "none",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "6px",
                    marginBottom: "10px",
                    width: '100%',
                    maxWidth: '31rem'
                  }}
                />
              </Box>
              
              {/* Phone Number and State on the same line */}
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <TextField
                  label="Phone Number"
                  type="tel"
                  variant="outlined"
                  required
                  sx={{
                    border: "none",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "6px",
                    marginBottom: "10px",
                    width: '100%',
                    maxWidth: '31rem'
                  }}
                />
                <TextField
                  label="State"
                  variant="outlined"
                  required
                  sx={{
                    border: "none",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "6px",
                    marginBottom: "10px",
                    width: '100%',
                    maxWidth: '31rem'
                  }}
                />
              </Box>
              
              {/* Description Field */}
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                sx={{
                  border: "none",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "6px",
                  marginBottom: "10px",
                }}
              />
              
              {/* Submit Button centered */}
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="primary" type="submit" sx={{ width: '20rem' }}>
                  Submit
                </Button>
              </Box>

            </Box>
          </form>
        </Box>
      </Box>
      <Footer/>
    </Box>
  );
};

export default Contact;
