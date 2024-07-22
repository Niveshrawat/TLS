import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';

const Banner = () => {
  const textAnimation = useSpring({
    from: { transform: 'translateY(100px)', opacity: 0 },
    to: { transform: 'translateY(0px)', opacity: 1 },
    config: { duration: 1000 },
  });

  const floatingAnimation1 = useSpring({
    loop: true,
    from: { transform: 'translateY(0px)' },
    to: [
      { transform: 'translateY(-10px)' },
      { transform: 'translateY(0px)' },
      { transform: 'translateY(10px)' },
      { transform: 'translateY(0px)' },
    ],
    config: { duration: 1000 },
  });

  const floatingAnimation2 = useSpring({
    loop: true,
    from: { transform: 'translateY(0px)' },
    to: [
      { transform: 'translateY(10px)' },
      { transform: 'translateY(0px)' },
      { transform: 'translateY(-10px)' },
      { transform: 'translateY(0px)' },
    ],
    config: { duration: 1000 },
  });

  const floatingAnimation3 = useSpring({
    loop: true,
    from: { transform: 'translateY(0px)' },
    to: [
      { transform: 'translateY(-15px)' },
      { transform: 'translateY(0px)' },
      { transform: 'translateY(15px)' },
      { transform: 'translateY(0px)' },
    ],
    config: { duration: 1000 },
  });

  const floatingAnimation4 = useSpring({
    loop: true,
    from: { transform: 'translateY(0px)' },
    to: [
      { transform: 'translateY(20px)' },
      { transform: 'translateY(0px)' },
      { transform: 'translateY(-20px)' },
      { transform: 'translateY(0px)' },
    ],
    config: { duration: 1000 },
  });

  const floatingAnimation5 = useSpring({
    loop: true,
    from: { transform: 'translateY(0px)' },
    to: [
      { transform: 'translateY(-25px)' },
      { transform: 'translateY(0px)' },
      { transform: 'translateY(25px)' },
      { transform: 'translateY(0px)' },
    ],
    config: { duration: 1000 },
  });

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
          <animated.div style={textAnimation}>
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

      <animated.div
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '60px',
          height: '60px',
          backgroundImage: 'url(https://data.themeim.com/html/tutorgo/assets/img/icons/dots-shapes.png)',
          backgroundSize: 'cover',
          ...floatingAnimation1,
        }}
      />
      <animated.div
        style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '50px',
          height: '50px',
          backgroundImage: 'url(https://data.themeim.com/html/tutorgo/assets/img/icons/role-shape.png)',
          backgroundSize: 'cover',
          ...floatingAnimation2,
        }}
      />
      <animated.div
        style={{
          position: 'absolute',
          top: '70%',
          left: '97%',
          width: '50px',
          height: '50px',
          backgroundImage: 'url(https://data.themeim.com/html/tutorgo/assets/img/icons/lines-shape.png)',
          backgroundSize: 'cover',
          ...floatingAnimation3,
        }}
      />
      <animated.div
        style={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          width: '60px',
          height: '60px',
          backgroundImage: 'url(https://data.themeim.com/html/tutorgo/assets/img/icons/book-shape.png)',
          backgroundSize: 'cover',
          ...floatingAnimation4,
        }}
      />
      <animated.div
        style={{
          position: 'absolute',
          top: '60%',
          right: '95%',
          width: '50px',
          height: '50px',
          backgroundImage: 'url(https://data.themeim.com/html/tutorgo/assets/img/icons/circle-shape.png)',
          backgroundSize: 'cover',
          ...floatingAnimation5,
        }}
      />
    </Box>
  );
};

export default Banner;
