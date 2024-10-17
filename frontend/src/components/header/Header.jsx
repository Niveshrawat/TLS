import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import Slider from 'react-slick';
import { Box, Typography, IconButton, Button, Grid, useMediaQuery, useTheme } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './header.css'

// Reusable floating animation hook
const useFloatingAnimation = (distance) => {
  return useSpring({
    loop: true,
    from: { transform: 'translateY(0px)' },
    to: [
      { transform: `translateY(${distance}px)` },
      { transform: 'translateY(0px)' },
      { transform: `translateY(-${distance}px)` },
      { transform: 'translateY(0px)' },
    ],
    config: { duration: 1000 },
  });
};

// Custom Arrow Components
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        bottom: '20px', // Position to the bottom right
        left: '60px',
        zIndex: 1,
        color: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background for glass effect
        backdropFilter: 'blur(10px)', // Apply blur for glass effect
        borderRadius: '50%', // Make it round
        width: '30px', // Reduce size
        height: '30px',
        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }, // Hover effect with more transparency
      }}
    >
      <ArrowForwardIosIcon sx={{ fontSize: '15px' }} /> {/* Smaller icon */}
    </IconButton>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        bottom: '20px', // Position to the bottom left
        left: '20px',
        zIndex: 1,
        color: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background for glass effect
        backdropFilter: 'blur(10px)', // Apply blur for glass effect
        borderRadius: '50%', // Make it round
        width: '30px', // Reduce size
        height: '30px',
        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }, // Hover effect with more transparency
      }}
    >
      <ArrowBackIosIcon sx={{ fontSize: '15px' }} /> {/* Smaller icon */}
    </IconButton>
  );
};

const BannerSlider = () => {
  // Define different floating animations for each banner
  const floating1 = useFloatingAnimation(10); // Small float
  const floating2 = useFloatingAnimation(20); // Medium float
  const floating3 = useFloatingAnimation(30); // Large float

  // Slider settings for react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,  // animated time ==========================================================================
    nextArrow: <NextArrow />, // Add custom next arrow
    prevArrow: <PrevArrow />, // Add custom previous arrow
  };

  // Use the Material-UI theme to detect mobile screen size
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isMobile) {
    // Render a static banner for mobile screens
    return (
      <Box
        sx={{
          width: '100%',
          height: { xs: '40rem', md: '950px' },
          backgroundColor: '#003285',
          color: 'white',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: { xs: '2rem', md: '0' },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Grid container sx={{ width: '100%' }} alignItems="center">
          <Grid
            item
            xs={12}
            md={6}
            sx={{ textAlign: { xs: 'center', md: 'left' }, px: { xs: 2, md: 3 } }}
          >
            <animated.div >
              <Typography
                variant="h4"
                component="h1"
                fontWeight="bold"
                sx={{ mt: { xs: 3, md: 2 }, ml: { xs: 2, md: 22 } }}
              >
                <span style={{ color: 'white' }}>Your <span style={{ color: '#F7C425' }}>Success</span> Journey Starts With Us</span>
              </Typography>
              <Typography
                variant="body1"
                component="h2"
                sx={{ mb: 4, mt: { xs: 2, md: 5 }, ml: { xs: 2, md: 22 } }}
              >
                Empowering career through skillful education journey
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{ mb: 4, ml: { xs: 2, md: 22 } }}
              >
                {/* Optional additional text can go here */}
              </Typography>
              <Button variant="contained" href="/all-courses" sx={{ ml: { xs: 1, md: 18 } }}>
                Explore Courses
              </Button>

            </animated.div>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}
          >
            {/* sx={{ width: '100%', maxWidth: { xs: '250px', md: '650px' }, height: 'auto', backgroundImage: "url(https://data.themeim.com/html/tutorgo/assets/img/icons/line-shape.png)" }} */}
            <div style={{ position: 'relative', display: 'inline-block' }}>

              <Box
                component="img"
                src="/images/smiling-happy-indian-student-with-backpack-pointing-his-finger-wall.png"
                alt="Online Learning"
                sx={{ width: '120%', maxWidth: { xs: '650px', md: '1000px' }, height: '20rem', marginLeft: "-6rem", marginTop: "2rem" }}
              />
              <div className="icons-container">
                <img style={{ position: 'absolute', display: 'inline-block', width: "40px", height: "auto" }} src="/images/learning.png" className="icon" alt="School Icon" />
                <img style={{ position: 'absolute', display: 'inline-block', width: "40px", height: "auto" }} src="/images/diploma.png" className="icon" alt="Diploma Icon" />
                <img style={{ position: 'absolute', display: 'inline-block', width: "40px", height: "auto" }} src="/images/online-course.png" className="icon" alt="Online Course Icon" />
                <img style={{ position: 'absolute', display: 'inline-block', width: "40px", height: "auto" }} src="/images/course.png" className="icon" alt="Course Icon" />
                <img style={{ position: 'absolute', display: 'inline-block', width: "40px", height: "auto" }} src="/images/mobile.png" className="icon" alt="Mobile Icon" />
                <img style={{ position: 'absolute', display: 'inline-block', width: "40px", height: "auto" }} src="/images/education.png" className="icon" alt="Education Icon" />
              </div>
            </div>
          </Grid>

        </Grid>

      </Box>
    );
  }

  // Render the slider for non-mobile screens
  return (
    <Box sx={{ width: '100%', height: 'auto', overflow: 'hidden' }}>
      <Slider {...settings}>
        {/* First banner */}
        <animated.div style={floating1}>
          <Box
            sx={{
              height: { xs: 'auto', md: '550px' },
              backgroundColor: '#003285',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Grid container sx={{ width: '100%' }} alignItems="center">
              <Grid
                item
                xs={12}
                md={6}
                sx={{ textAlign: { xs: 'center', md: 'left' }, px: { xs: 2, md: 3 } }}
              >
                <animated.div>
                  <Typography
                    variant="h2"
                    component="h1"
                    fontWeight="bold"
                    sx={{ mt: { xs: 2, md: 8 }, ml: { xs: 2, md: 8 } }}
                  >
                    <span style={{ color: 'white' }}>Your <span style={{ color: '#F7C425' }}>Success</span> Journey Starts With Us</span>
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ mb: 4, mt: { xs: 2, md: 5 }, ml: { xs: 2, md: 8 } }}
                  >
                    Empowering career through skillful education journey
                  </Typography>
                  <Button variant="contained" href="/all-courses" sx={{ ml: { xs: 2, md: 8 } }}>
                    Explore Courses
                  </Button>
                </animated.div>
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
                sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'center' }, marginLeft: "-5rem", marginTop: "3rem" }}
              >
                <div style={{ position: 'relative', display: 'inline-block' }}>

                  <Box
                    component="img"
                    src="/images/smiling-happy-indian-student-with-backpack-pointing-his-finger-wall.png"
                    alt="Online Learning"
                    sx={{ width: '100%', maxWidth: { xs: '300px', md: '1000px' }, height: '500px' }}
                  />
                  <div className="icons-container">
                    <img src="/images/learning.png" className="icon" alt="School Icon" />
                    <img src="/images/diploma.png" className="icon" alt="Diploma Icon" />
                    <img src="/images/online-course.png" className="icon" alt="Online Course Icon" />
                    <img src="/images/course.png" className="icon" alt="Course Icon" />
                    <img src="/images/mobile.png" className="icon" alt="Mobile Icon" />
                    <img src="/images/education.png" className="icon" alt="Education Icon" />
                  </div>
                </div>
              </Grid>

            </Grid>

          </Box>
        </animated.div>

        {/* Second banner */}
        <animated.div style={floating2} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box
            sx={{
              height: { xs: 'auto', md: '550px' },
              backgroundColor: '#B7E0FF',
              color: 'black',
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Grid container sx={{ width: '100%' }} alignItems="center">
              <Grid
                item
                xs={12}
                md={6}
                sx={{ textAlign: { xs: 'center', md: 'left' }, px: { xs: 2, md: 3 } }}
              >
                <animated.div>
                  <Typography
                    variant="h2"
                    component="h1"
                    fontWeight="bold"
                    sx={{ mt: { xs: 2, md: -10 }, ml: { xs: 2, md: -20 } }}
                  >
                    <img
                      src="https://omlogistics.co.in/wp-content/uploads/2023/11/logo-e1700897900588.png"
                      alt="OM Logistics"
                    />
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{ mb: 4, fontWeight: "bold", mt: { xs: 2, md: 5 }, ml: { xs: 2, md: 22 }, color: 'black' }}
                  >
                    Seamless Solutions for Smarter Logistics.
                  </Typography>
                  <Button variant="contained" href="/vocational-education" sx={{ ml: { xs: 2, md: 22 } }}>
                    Explore Courses
                  </Button>
                </animated.div>
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
                sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}
              >
                <Box
                  component="img"
                  src="/images/logicss.jpg"
                  alt="Online Learning"
                  sx={{
                    width: '100%',
                    maxWidth: { xs: '200px', md: '900px' },
                    height: '550px',
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </animated.div>

        {/* Third banner */}
        <animated.div style={floating3} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box
            sx={{
              height: { xs: 'auto', md: '550px' },
              backgroundColor: '#002B5B', // Darker shade of blue for better contrast
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Adds shadow for depth
              // borderRadius: '12px', // Slightly rounded corners
            }}
          >
            <Grid container sx={{ width: '100%' }} alignItems="center">
              <Grid
                item
                xs={12}
                md={6}
                sx={{ textAlign: { xs: 'center', md: 'left' }, px: { xs: 2, md: 3 } }}
              >
                <animated.div>
                  <Typography
                    variant="h4"
                    component="h1"
                    fontWeight="bold"
                    sx={{
                      mt: { xs: 2, md: 8 },
                      ml: { xs: 2, md: 8 },
                      fontSize: { xs: '1.8rem', md: '2.5rem' }, // Adjust font size for responsiveness
                      lineHeight: '1.5',
                      color: 'white',
                    }}
                  >
                    <span>
                      The
                      <span style={{ color: '#F7C425' }}> Banking Expert</span> Program<br />
                      Helps You Start Your
                      <span style={{ color: '#F7C425' }}> Career</span><br />
                      with Top Banks
                    </span>
                  </Typography>

                  <Button
                    variant="contained"
                    href="/all-courses"
                    sx={{
                      ml: { xs: 2, md: 8 },
                      marginTop: '2rem',
                      backgroundColor: '#F7C425',
                      color: '#003285',
                      padding: '0.8rem 1.5rem',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: '#e6b21e',
                      },
                    }}
                  >
                    Explore Courses
                  </Button>
                </animated.div>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}
              >
                <Box
                  component="img"
                  src="/images/banker.png"
                  alt="Online Learning"
                  sx={{
                    width: { xs: '80%', md: '100%' }, // Adjust for responsiveness
                    maxWidth: { xs: '400px', md: '1000px' }, // Reduce the size on larger screens
                    height: '550px',
                    // Adds a soft shadow to the image
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </animated.div>

      </Slider>
    </Box>
  );
};

export default BannerSlider;
