import React from 'react';
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PromotionalBox = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        mt: 10,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row', // Column layout for mobile, row for larger screens
        alignItems: 'center',
        justifyContent: isMobile ? 'center' : 'space-between', // Adjust spacing between elements
        border: '1px solid #ddd',
        borderRadius: '20px',
        p: isMobile ? 2 : 3, // Adjust padding for mobile
        mb: 4,
        backgroundColor: '#EEF5FF',
        width: '100%', // Full width
        maxWidth: '80%', // Ensures it does not overflow on smaller devices
        height: isMobile ? 'auto' : '150px', // Adjust height for mobile and larger screens
        margin: '0 auto', // Center the box horizontally
        textAlign: isMobile ? 'center' : 'left', // Center text on mobile, align left on larger screens
        boxSizing: 'border-box', // Ensures padding is included in width
      }}
>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: isMobile ? 2 : 0, // Margin bottom for mobile, no margin for larger screens
        }}
      >
        <img
          src="/images/TLS_LOGO.png" // Replace with the correct image path
          alt="Logo"
          style={{
            width: isMobile ? '150px' : '200px', // Adjust image size for mobile
            height: 'auto',
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: isMobile ? 'center' : 'left',
          width: isMobile ? '100%' : 'auto',
          px: isMobile ? 1 : 2, // Adjust padding for mobile
          mb: isMobile ? 2 : 0, // Margin bottom on mobile to separate text and button
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 0.5,
            fontWeight: 700,
            fontSize: isMobile ? '1rem' : '1.25rem', // Adjust font size for mobile
          }}
        >
          Introducing a career platform for college students & fresh grads
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 2, // Margin bottom for spacing before button
            fontSize: isMobile ? '0.875rem' : '1rem', // Adjust font size for mobile
          }}
        >
          Explore courses, vocational courses & prepare for your dream career & find jobs & internships.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/jobs')}
          sx={{
            width: isMobile ? '100%' : 'auto', // Full width on mobile
            borderRadius: '50px',
            textAlign: 'center',
          }}
        >
          Explore More
        </Button>
      </Box>
    </Box>
  );
};

export default PromotionalBox;
