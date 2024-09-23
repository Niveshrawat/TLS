// LoginPage.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slice/userSlice';
import { Box, Card, CardContent, Typography, TextField, Button, Link, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState(''); // Updated from email to identifier
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  const { user, status, error } = useSelector((state) => state.user);
  // console.log(user)

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


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Save JWT token to localStorage
  const saveToken = (token) => {
    localStorage.setItem('token', token);
  };

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ identifier, password })).then((result) => {
      if (result.type === 'user/loginUser/fulfilled') {
        const { token } = result.payload;
        saveToken(token);
        navigate('/'); // Redirect to the main page after login
      }
    });
  };


  return (
    
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: "#EEF7FF" }}>
       <Card sx={{ maxWidth: 400, padding: 2 }}>
        <CardContent>
          <img
            src="/images/TLS_LOGO.png"
            alt="Logo"
            style={{ height: '10rem', align: 'center', marginLeft: '6rem', marginTop: '-3rem' }}
          />
          <Typography variant="h4" component="div" align='center' fontWeight="bold" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email or Phone" // Updated label
              variant="outlined"
              fullWidth
              margin="normal"
              value={identifier} // Updated from email to identifier
              onChange={(e) => setIdentifier(e.target.value)} // Handle change for identifier
            />
            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} type="submit">
              Login
            </Button>
            {status === 'failed' && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          </form>
          <Typography sx={{ mt: 2 }}>
            <Link href="/forgot-password" underline="hover">
              Forgot Password?
            </Link>
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Link href="/register" underline="hover">
              Register
            </Link>
          </Typography>
        </CardContent>
      </Card>
  

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
      {/* Other animated elements */}
    </Box>
  );
};

export default LoginPage;
