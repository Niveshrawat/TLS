import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(login({ email, password })).unwrap();
      if (response.success) {
        localStorage.setItem('role', response.user.role);
        localStorage.setItem('token', response.token);
        if (response.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (response.user.role === 'teamLeader') {
          navigate('/teamLeader/dashboard');
        } else if (response.user.role === 'caller') {
          navigate('/caller/dashboard');
        } else {
          alert('Invalid role');
        }
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed due to an error.');
    }
  };

  return (
    <Box sx={{ backgroundColor: '#EEF7FF', overflow: 'hidden' }}>
      <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#EEF7FF' }}>
        <Card>
          <CardContent>
            <div style={{ textAlign: 'center', padding: '14px' }}>
              <img src="/TLS_20240723_132205_0000.png" alt="Logo" style={{ height: '10rem', marginTop: '-2rem' }} />
            </div>
            <Typography variant="h4" align="center" fontWeight="bold" gutterBottom marginTop="-3rem">
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box mt={2} mb={4}>
                <Button type="submit" variant="contained" color="primary" fullWidth marginBottom="2rem">
                  Login
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
