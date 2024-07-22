// LoginPage.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slice/userSlice';
import { Box, Card, CardContent, Typography, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, status, error } = useSelector((state) => state.user);

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

  // Handle form submission
  const saveToken = (token) => {
    localStorage.setItem('token', token);
  };

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((result) => {
      if (result.type === 'user/loginUser/fulfilled') {
        const { token } = result.payload; // Assuming the JWT token is returned in the response payload
        saveToken(token); // Save token to local storage
        navigate('/'); // Redirect to the main page
      }
    });
  };


  return (
    
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: "#EEF7FF" }}>
        <Card sx={{ maxWidth: 400, padding: 2 }}>
          <CardContent>
            <Typography variant="h4" component="div" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleLogin}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} type="submit">
                Login
              </Button>
              {status === 'failed' && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
            </form>
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
      {/* Other animated elements */}
    </Box>
  );
};

export default LoginPage;
