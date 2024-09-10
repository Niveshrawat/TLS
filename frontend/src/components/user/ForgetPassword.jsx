import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestPasswordReset } from '../../redux/slice/userSlice';
import { Box, Card, CardContent, Typography, TextField, Button} from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  
  const { status, error } = useSelector((state) => state.user);

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

  const handlePasswordReset = (e) => {
    e.preventDefault();
    dispatch(requestPasswordReset({ email }));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      toast.success('Password reset email sent successfully!');
    } else if (status === 'failed' && error) {
      toast.error(error);
    }
  }, [status, error]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: "#EEF7FF" }}>
      <Card sx={{ maxWidth: 400, padding: 2 }}>
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            Forgot Password
          </Typography>
          <form onSubmit={handlePasswordReset}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} type="submit">
              Submit
            </Button>
            {/* Optional: Error and success messages */}
            {status === 'failed' && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          </form>
          
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
      
      <ToastContainer /> {/* Add ToastContainer here */}
    </Box>
  );
};

export default ForgotPasswordPage;
