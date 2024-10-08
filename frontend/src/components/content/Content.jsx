// BenefitSection.js
import React from 'react';
import { Box, Grid, Typography, Button, List, ListItem, ListItemIcon, ListItemText, Checkbox } from '@mui/material';

const BenefitSection = () => {
  const images = {
    main: '/images/mainpicture.jpg',
    ring: 'https://data.themeim.com/html/tutorgo/assets/img/icons/ring-shape.png',
    secondary: 'https://data.themeim.com/html/tutorgo/assets/img/about/about-2.jpg',
  };

  const content = (
    <div className="tp-section__title-wrapper">
      <Typography variant="h4" component="h3" className="tp-section__title mb-15" gutterBottom fontWeight='bold' marginTop="3rem">
      Beverages online learning <br/>expertise to enhance your professional skills
      </Typography>
      {/* <Typography className="mb-40" paragraph>
        Lorem ipsum dolor sit amet, consectetur aliqua adipiscing elit, sed do eiumod tempor.
      </Typography> */}
      <List className="tp-about__feature-list mb-40">
        <ListItem>
          <ListItemIcon>
            <Checkbox checked={true} />
          </ListItemIcon>
          <ListItemText primary="Upskill your organization." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Checkbox checked={true} />
          </ListItemIcon>
          <ListItemText primary="Access more  online courses" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Checkbox checked={true} />
          </ListItemIcon>
          <ListItemText primary="Corporate Hiring" />
        </ListItem>
      </List>
      {/* <Box className="tp-hero__btn-wrapper">
        <Button variant="outlined" href="about-us.html" className="tp-border-btn br-0">
          Get Started
        </Button>
      </Box> */}
    </div>
  );

  return (
    <Box sx={{ padding: 4  }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative', height: '100%', minHeight: 200 }}>
            <Box
              component="img"
              src={images.ring}
              alt="Ring Shape"
              sx={{
                width: '40%',
                height: 'auto',
                position: 'absolute',
                top: '0%',
                left: '50%',
                zIndex: 1,
                opacity: 0.2,
              }}
            />
            <Box
              component="img"
              src={images.main}
              alt="Main Image"
              sx={{
                width:{xs:'45%', md:'35%'},
                height: 'auto',
                position: 'absolute',
                top: '3%',
                left: '35%',
                zIndex: 2,
              }}
            />
            <Box
              component="img"
              src={images.secondary}
              alt="Secondary Image"
              sx={{
                width: '20%',
                height: 'auto',
                position: 'absolute',
                top: '40%',
                left: '65%',
                zIndex: 3,
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          {content}
        </Grid>
      </Grid>
    </Box>
  );
};

export default BenefitSection;
