import React, { useState, useRef } from 'react';
import {
  AppBar, Toolbar, Snackbar, Alert, Typography, Button, Container, Box, Grid, TextField, MenuItem, Dialog, DialogContent, DialogActions, DialogTitle
} from '@mui/material';
import { styled } from '@mui/system';
import { useSpring, animated } from 'react-spring';
import Footer from '../footer/Footer';
import Navbar from '../header/Navbar';

const Banner = styled(Box)(({ theme }) => ({
  backgroundColor: '#333f59',
  color: 'white',
  textAlign: 'center',
  padding: theme.spacing(20, 0),
}));

const Benefits = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(10),
  display: 'contents',
  justifyContent: 'center',
  gap: theme.spacing(2),
}));

// const Benefits = styled(Box)(({ theme }) => ({
//   textAlign: 'center',
//   padding: theme.spacing(2),
//   boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//   borderRadius: '8px',
//   backgroundColor: 'white',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   alignItems: 'center',
//   width: '250px',
//   height: '150px',
// }));

const FormContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(10),
  padding: theme.spacing(4),
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
}));

const FormField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1, 0),
}));

const benefits = [
  { title: 'Industry-Relevant Content', content: 'Our workshops are carefully curated to cover the latest trends and technologies shaping the future of various industries. We ensure that our workshops provide students with insights into the most in-demand skills sought by employers.' },
  { title: 'Hands-On Learning', content: 'We believe in learning by doing. That’s why our workshops are designed to be interactive and hands-on, allowing students to apply theoretical concepts in practical, real-world scenarios. Whether you’re a beginner or an experienced enthusiast, our workshops cater to students of all skill levels.' },
  { title: 'Expert Instructors', content: 'Our workshops are led by experienced industry professionals who are experts in their respective fields. They bring a wealth of knowledge and practical experience to the table, ensuring that students receive top-notch instruction and guidance throughout the workshop.' },
  { title: 'Networking Opportunities', content: 'In addition to learning new skills, our workshops provide students with valuable networking opportunities. Interact with industry professionals, connect with like-minded peers, and expand your professional network—all while gaining invaluable insights into the tech industry.' },
];

const IndustrialWorkshopPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    organization: '',
    comment: '',
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, email, organization, comment } = formData;

    if (!name || !phone || !email || !organization || !comment) {
      setAlertMessage('Please complete all fields');
      setAlertOpen(true);
    } else {
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleExploreClick = () => {
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const dotsAnimation = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
    config: { duration: 2000 },
    reset: true,
    loop: true,
  });

  return (
    <Box>
      <Navbar/>
      <Banner>
        <Typography variant="h2">Industrial Workshops</Typography>
      </Banner>

      <Container>
        

        <Grid container spacing={4} sx={{ marginTop: 2 }}>
          <Grid item xs={12} md={6}>
          <Typography variant="h4"  sx={{ marginTop: 4, color:'#FF9EAA' }}>
          Empowering Students with Cutting-Edge Technology Workshops!
        </Typography>
            <Typography variant="body1" sx={{ marginTop: 4, fontSize:20 }}>
              Are you a student eager to stay ahead of the curve and gain valuable skills in today’s rapidly evolving tech landscape? Look no further!
              At Easy Courses, we’re committed to providing students with hands-on workshops focused on industry-relevant technologies, giving you the exposure you need to thrive in the digital age.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* <animated.div style={dotsAnimation}> */}
              <Box
                component="img"
                src="https://cdn.pixabay.com/photo/2021/09/07/20/28/woman-6604888_640.png"
                alt="Workshop"
                sx={{ width: '100%', maxWidth: '400px', height: 'auto' }}
              />
            {/* </animated.div> */}
          </Grid>
        </Grid>
      </Container>

     
      <Benefits>
        <Typography variant="h4" align="center" marginTop='2rem' gutterBottom>Why Choose Us?</Typography>
        {benefits.map((benefit, index) => (
          <Box key={index} marginTop="2rem" marginLeft='10rem' width='80%' >
            <Typography variant="h5" color='#FF9EAA'>{benefit.title}</Typography>
            <Typography variant="body1" display='flex' marginTop="2rem">{benefit.content}</Typography>
          </Box>
        ))}
      </Benefits>

      <FormContainer ref={formRef} marginTop='10rem'>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" align="center">Register for Workshop</Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <FormField
                fullWidth
                label="Name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <FormField
                fullWidth
                label="Phone Number"
                variant="outlined"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <FormField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <FormField
                fullWidth
                label="Organization"
                variant="outlined"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
              />
              <FormField
                fullWidth
                label="Comment"
                variant="outlined"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                multiline
                rows={4}
              />
              <Box display="flex" justifyContent="center">
                <Button variant="contained" color="primary" type="submit">Submit</Button>
              </Box>
            </form>
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="center">
            <Box
              component="img"
              src="https://cdn.pixabay.com/photo/2021/09/07/20/28/woman-6604888_640.png"
              alt="Workshop"
              sx={{ width: '100%', maxWidth: '400px', height: 'auto' }}
            />
          </Grid>
        </Grid>
      </FormContainer>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Congratulations 🎉🎊</DialogTitle>
        <DialogContent>
          <Typography>Your form has been submitted!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Footer />
    </Box>
  );
};

export default IndustrialWorkshopPage;
