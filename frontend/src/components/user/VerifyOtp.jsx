// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { TextField, Button, Typography, Card, CardContent, Box } from '@mui/material';
// import { verifyOtp } from '../../redux/slice/userSlice';

// const VerifyOtp = () => {
//   const [otp, setOtp] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const userStatus = useSelector((state) => state.user.status);
//   const userError = useSelector((state) => state.user.error);
//   const verificationSid = useSelector((state) => state.user.verificationSid); // Assuming you store verificationSid in Redux

//   const handleChange = (e) => {
//     setOtp(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(verifyOtp({ otp, verificationSid })).then((action) => {
//       if (action.meta.requestStatus === 'fulfilled') {
//         navigate('/'); // Redirect to home or another page upon successful verification
//       }
//     });
//   };

//   return (
//     <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
//       <Card>
//         <CardContent>
//           <Typography variant="h5" align="center" gutterBottom>
//             Verify OTP
//           </Typography>
//           <form onSubmit={handleSubmit}>
//             <TextField
//               name="otp"
//               type="text"
//               label="OTP"
//               variant="outlined"
//               value={otp}
//               onChange={handleChange}
//               fullWidth
//             />
//             <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: '1rem' }}>
//               Verify
//             </Button>
//           </form>
//           {userStatus === 'loading' && <Typography variant="body2" color="textSecondary" align="center">Verifying...</Typography>}
//           {userError && <Typography variant="body2" color="error" align="center">{userError}</Typography>}
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default VerifyOtp;
