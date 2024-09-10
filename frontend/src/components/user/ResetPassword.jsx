import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../redux/slice/userSlice';
import { Box, Card, CardContent, Typography, TextField, Button, Link  } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPasswordPage = () => {
  const { token } = useParams(); // Get the token from the URL
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState('');
  const { status, error } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ token, newPassword }));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      toast.success('Password reset successfully');
    } else if (status === 'failed' && error) {
      toast.error(error);
    }
  }, [status, error]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: "#EEF7FF" }}>
      <Card sx={{ maxWidth: 400, padding: 2 }}>
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            Reset Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="New Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} type="submit">
              Reset Password
            </Button>
          </form>
          <Typography sx={{ mt: 2 }}>
            Now Login{' '}
            <Link href="/login" underline="hover">
              Login
            </Link>
          </Typography>
        </CardContent>
      </Card>
      <ToastContainer /> {/* Add ToastContainer here */}
    </Box>
  );
};

export default ResetPasswordPage;
