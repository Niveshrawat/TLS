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
        top: '40%',
        right: '10px',
        transform: 'translateY(-50%)',
        zIndex: 2,
        color: 'white',
        backgroundColor: '#00000099', // Semi-transparent background
        '&:hover': { backgroundColor: '#003285' }, // Darker on hover
      }}
    >
      <ArrowForwardIosIcon />
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
        top: '40%',
        left: '10px',
        transform: 'translateY(-50%)',
        zIndex: 2,
        color: 'white',
        backgroundColor: '#00000099', // Semi-transparent background
        '&:hover': { backgroundColor: '#003285' }, // Darker on hover
      }}
    >
      <ArrowBackIosIcon />
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
    autoplaySpeed: 3000,
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
        height: { xs: 'auto', md: '950px' },
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
              variant="h2"
              component="h1"
              fontWeight="bold"
              sx={{ mt: { xs: 2, md: 2 }, ml: { xs: 2, md: 22 } }}
            >
              <span style={{ color: 'white' }}>Your success journey starts with us</span>
            </Typography>
            <Typography
              variant="h6"
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
            <Button variant="contained" href="/all-courses" sx={{ ml: { xs: 2, md: 22 } }}>
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
            src="https://data.themeim.com/html/tutorgo/assets/img/hero/hero-img-1.png"
            alt="Online Learning"
            sx={{ width: '100%', maxWidth: { xs: '300px', md: '650px' }, height: 'auto', backgroundImage: "url(https://data.themeim.com/html/tutorgo/assets/img/icons/line-shape.png)" }}
          />
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
              height: { xs: 'auto', md: '700px' },
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
                    sx={{ mt: { xs: 2, md: -10 }, ml: { xs: 2, md: 22 } }}
                  >
                    <span style={{ color: 'white' }}>Your success journey starts with us</span>
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ mb: 4, mt: { xs: 2, md: 5 }, ml: { xs: 2, md: 22 } }}
                  >
                    Empowering career through skillful education journey
                  </Typography>
                  <Button variant="contained" href="/all-courses" sx={{ ml: { xs: 2, md: 28 } }}>
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
                  src="/images/front-photo.png"
                  alt="Online Learning"
                  sx={{
                    width: '100%',
                    maxWidth: { xs: '300px', md: '1000px' },
                    height: '550px',
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </animated.div>

        {/* Second banner */}
        <animated.div style={floating2} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box
            sx={{
              height: { xs: 'auto', md: '700px' },
              backgroundColor: '#F5EFFF',
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
                    variant="h6"
                    component="h2"
                    sx={{ mb: 4, mt: { xs: 2, md: 5 }, ml: { xs: 2, md: 24 }, color: 'black' }}
                  >
                    Empowering career through skillful education journey
                  </Typography>
                  <Button variant="contained" href="/all-courses" sx={{ ml: { xs: 2, md: 22 } }}>
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
                  src="/images/second-photo.png"
                  alt="Online Learning"
                  sx={{
                    width: '100%',
                    maxWidth: { xs: '400px', md: '1000px' },
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
      height: { xs: 'auto', md: '700px' },
      backgroundColor: '#003285',
      color: 'white',
      display: { xs: 'none', md: 'flex' }, // Hide this on mobile as well
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
           <Grid container sx={{ width: '100%' }} alignItems="center">
 

  <Grid
    item
    xs={12}
    md={6}
    sx={{  justifyContent: { xs: 'center', md: 'center' }, marginLeft:'20rem' }}
  >
        <div style={{ position: 'relative', display: 'inline-block' }}>

    <Box
      component="img"
      src="/images/smiling-happy-indian-student-with-backpack-pointing-his-finger-wall.png"
      alt="Online Learning"
      sx={{ width: '100%', maxWidth: { xs: '300px', md: '1000px' }, height: '550px' }}
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
      </Slider>
    </Box>
  );
};

export default BannerSlider;
