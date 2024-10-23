import React from 'react';
import { Box, Typography } from '@mui/material';
import Navbar from '../header/Navbar';
import { styled } from '@mui/system';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import './about.css';
import Footer from '../footer/Footer';

const CircleWrapper = styled('div')({
  position: 'relative',
  display: 'inline-block',
  margin: '20px',
  alignItems: 'center',
  textAlign: 'center', // Center the icon and the text horizontally
});

const IconCircle = styled('div')({
  position: 'relative',
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  backgroundColor: '#fff',
  border: '2px solid #0d47a1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  marginBottom: '10px', // Add some space between the icon and the label
});

const RotatingOutline = styled('div')({
  position: 'absolute',
  top: '-10px',
  left: '-10px',
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  border: '2px solid red',
  borderTop: '2px solid transparent',
  animation: 'rotate 2s linear infinite',
});

const icons = [
  { Icon: LibraryBooksIcon, label: 'Comprehensive Courses' },
  { Icon: SchoolIcon, label: 'College Admissions' },
  { Icon: WorkIcon, label: 'Job Opportunities' },
  { Icon: AssignmentIcon, label: 'Job Poster Registration' },
];

const About = () => {
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
            src="https://lottie.host/c12e54e4-bf45-4650-bee8-3a35eff030fc/ReiMgXOgNR.json"
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
          <Typography variant="h3" sx={{ color: 'black', fontWeight: 'bold' }}>
            Our Mission
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, maxWidth: '600px', mx: { xs: 'auto', md: 0 } }}>
            At TheLearnSkills(Skyingskills Edutech Pvt. Ltd), we are dedicated to empowering individuals and organizations through
            exceptional educational and career opportunities. Our mission is to bridge the gap between
            education and career success by providing a range of services designed to help you achieve your goals. 
            Whether you are looking to enhance your skills, find the right college, secure a job, or connect with 
            talented individuals, we are here to support you every step of the way.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography
          variant="h3"
          sx={{
            mb: 5,
            color: 'black',
            fontWeight: 'bold',
          }}
        >
          We Offer
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {icons.map((item, index) => (
            <CircleWrapper key={index}>
              <IconCircle sx={{ color: 'red' }}>
                <item.Icon style={{ fontSize: 40, color: '#0d47a1' }} />
              </IconCircle>
              <Typography variant="subtitle1" sx={{ color: '#0d47a1', fontWeight: 'bold' }}>
                {item.label}
              </Typography>
              <RotatingOutline />
            </CircleWrapper>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          textAlign: { xs: 'center', md: 'left' },
          mt: 5,
          mb: 5,
          mx: { xs: 3, md: 'auto' },
          maxWidth: '600px',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Join Us
        </Typography>
        <Typography variant="body1" sx={{ color: 'black', mt: 2 }}>
          Whether you are a student, job seeker, educational institution, or employer, we invite you to explore our platform and take advantage of the opportunities we offer. Join us today and become part of a vibrant community dedicated to achieving educational and career success.
        </Typography>
      </Box>

      <Footer />
    </Box>
  );
};

export default About;
