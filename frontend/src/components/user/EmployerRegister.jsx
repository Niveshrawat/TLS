import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Link, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useSpring, animated } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';



const JobPosterRegistrationForm = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    companyName: '',
    industryType: '',
    designation: '',
    officialEmailId: '',
    mobileNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValues.officialEmailId.includes('@')) {
      toast.warning('An official id (example: name@company_name.com) is strongly recommended as it helps us verify that you represent the company and enables us to provide you a quick service. If you\'re a student, please register here.', {
        autoClose: 8000
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('https://api.thelearnskills.com/api/v1/auth/job/register-job-poster', formValues);
      toast.success(response.data.message);
      navigate('/login-employer');

    } catch (error) {
      toast.error('Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }

  };
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
    <div style={{position: 'relative', overflowY: 'hidden', backgroundColor: "#EEF7FF", minHeight: '100vh' }}>
    <Container maxWidth="sm" sx={{}}>
      <Box 
        boxShadow={3} 
        p={3} 
        mt={10} 
        borderRadius={2} 
        bgcolor="background.paper"
        maxWidth={400}
      >
         <img
            src="/images/Tls.png"
            alt="Logo"
            style={{ height: '10rem', display: 'block', margin: 'auto', marginBottom: '-2rem', marginTop:'-3rem' }}
          />
        <Typography variant="h5" gutterBottom textAlign="center" fontWeight="bold">
          Employer Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Company Name"
            name="companyName"
            value={formValues.companyName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Industry Type"
            name="industryType"
            value={formValues.industryType}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Designation"
            name="designation"
            value={formValues.designation}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Official Email ID"
            name="officialEmailId"
            type="email"
            value={formValues.officialEmailId}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Mobile Number"
            name="mobileNumber"
            value={formValues.mobileNumber}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
        <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
          Already have an account? <Link href="/login-employer">Login here</Link>
        </Typography>
        <Typography variant="body2" align="center" style={{ marginTop: '8px' }}>
          Are you a student? <Link href="/register">Register here</Link>
        </Typography>
      </Box>
      <ToastContainer />
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
    </Container>
    </div>
  );
};

export default JobPosterRegistrationForm;
