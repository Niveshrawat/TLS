import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import Slider from 'react-slick';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import DomainVerificationOutlinedIcon from '@mui/icons-material/DomainVerificationOutlined';

const categories = [
  { title: 'University Admission', description: 'Guidance for university enrollment.', icon: <SchoolOutlinedIcon /> },
  { title: 'Online Certification', description: 'Earn credentials online.', icon: <VerifiedOutlinedIcon /> },
  { title: 'Vocational Education', description: 'Hands-on training for specific skills.', icon: <BuildOutlinedIcon /> },
  { title: 'Corporate Connect', description: 'Networking with corporates.', icon: <BusinessIcon /> },
  { title: 'Internship and Industrial Program', description: 'Practical industry experience.', icon: <WorkOutlineOutlinedIcon /> },
  { title: 'Job Support', description: 'Career assistance and job placement.', icon: <HelpCenterOutlinedIcon /> },
  { title: 'MDP/FDP', description: 'Management & Faculty Development Programs.', icon: <LocalLibraryOutlinedIcon /> },
  { title: 'Enterprise Solution', description: 'Business solutions for companies.', icon: <DomainVerificationOutlinedIcon /> },
];

const CategoryBox = ({ title, description, icon }) => {
  const [hovered, setHovered] = React.useState(false);
  const iconAnimation = useSpring({
    transform: hovered ? 'scale(1.5)' : 'scale(1)',
    config: { tension: 300, friction: 10 },
  });

  return (
    <animated.div>
      <Card
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          textAlign: 'center',
          height: '300px',
          width: { xs: '100%', sm: '12rem' },
          display: 'flex',
          border: '1px solid #ccc',
          color: hovered ? '#003285' : 'white', // Change text color to blue on hover
          backgroundColor: '#003285', // Set background to white on hover
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          transition: 'color 0.3s ease', // Smooth transition for text color
          position: 'relative', // Necessary for absolute positioning of the pseudo-element
          overflow: 'hidden', // Ensures the gradient does not overflow
        }}
        elevation={hovered ? 3 : 1}
      >
        <CardContent sx={{ position: 'relative', zIndex: 2 }}> {/* Keep text above sliding box */}
        <animated.div style={iconAnimation}>{icon}</animated.div>
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="body2">
            {description}
          </Typography>
        </CardContent>
        {hovered && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: '-100%', // Start outside the left
              width: '100%',
              height: '100%',
              backgroundColor: 'white',
              animation: 'slideIn 0.5s forwards', // Animation for the sliding effect
              zIndex: 1, // Behind the text
            }}
          />
        )}
      </Card>
      <style>
        {`
          @keyframes slideIn {
            0% {
              left: -100%;
            }
            100% {
              left: 0;
            }
          }
        `}
      </style>
    </animated.div>
  );
};





const PopularCategory = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ backgroundColor: '#003285', color: 'white', padding: 4, height:'650px' }}>
      <Typography variant="h5" textAlign="center" gutterBottom marginTop='4rem' fontWeight="bold">
        Popular Category
      </Typography>
      <Typography variant="subtitle1" textAlign="center" mb={4}>
        We offer a comprehensive suite of services to help you achieve your educational and career goals.
      </Typography>

      <Box mx="auto" maxWidth="1000px" marginTop="5rem">
        <Slider {...sliderSettings}>
          {categories.map((category, index) => (
            <Box key={index} px={2}>
              <CategoryBox title={category.title} description={category.description} icon={category.icon} />
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default PopularCategory;
