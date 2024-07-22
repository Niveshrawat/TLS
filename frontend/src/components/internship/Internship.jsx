import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typography, Button, Container, Box, Grid, TextField, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { submitForm } from '../../redux/slice/internshipSlice';
import Footer from '../footer/Footer';
import Navbar from '../header/Navbar';

const Banner = styled(Box)(({ theme }) => ({
  backgroundColor: '#003285',
  color: 'white',
  textAlign: 'center',
  padding: theme.spacing(20, 0),
}));

const Benefits = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(50),
  display: 'contents',
  justifyContent: 'center',
  gap: theme.spacing(2),
}));

const BenefitBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  boxShadow: '0px 4px 12px #F5DAD2',
  borderRadius: '8px',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '200px',
  height: '120px',
}));

const FormContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(10),
  padding: theme.spacing(2),
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  maxWidth: '-500px', // Set the maxWidth to decrease the width
}));

const FormField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1, 0),
}));

const benefits = [
  { title: 'Industry Approach', icon: '🏭' },
  { title: 'Dedicated Mentor', icon: '👨‍🏫' },
  { title: 'Live Projects', icon: '👨🏻‍💻' },
  { title: 'Capstone Projects', icon: '🎯' },
  { title: 'Dual Certification', icon: '📜' },
];

const type = [
  'Internship',
  'Workshop'
  
];

const workshopType = [
  'Technical',
  'Management',
  'Safety',
  'Others'
];

const InternshipPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    emailId: '',
    phoneNumber: '',
    currentCity: '',
    organization: '',
    designation: '',
    workshopType: '',
    workshopDate: '',
    comments: ''
  });

  const formRef = useRef(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleExploreClick = () => {
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
    console.log('Token:', token); // Debugging

    if (!token) {
      toast.error('You must be logged in to submit the form.');
      return;
    }

    const { name, phoneNumber, emailId, workshopType, currentCity, organization, designation, workshopDate, comments } = formData;
    if (!name || !phoneNumber || !emailId || !workshopType || !currentCity || !organization || !designation || !workshopDate || !comments) {
      toast.error('Please complete all fields');
    } else {
      console.log('Form Data:', formData); // Debugging
      dispatch(submitForm({ formData, token }))
        .unwrap()
        .then(() => {
          toast.success('Form submitted successfully');
        })
        .catch((error) => {
          console.error('Form submission error:', error); // Debugging
          toast.error(`Form submission failed: ${error.message}`);
        });
    }
  };

  return (
    <Box>
      <Navbar />
      <Banner>
        <Typography variant="h3" fontWeight="bold">Internship and Industrial Program</Typography>
        <Typography variant="h5">"Embark on Your Career Journey: Where Opportunities and Ambitions Collide!"</Typography>
        <Button variant="contained" color="secondary" sx={{ marginTop: 2 }} onClick={handleExploreClick}>
          Explore Opportunity
        </Button>
      </Banner>

      <Benefits>
        <Typography variant="h4" align="center" fontWeight="bold" marginTop="2rem" gutterBottom>Benefits of Joining us</Typography>
        <Grid container spacing={2} justifyContent="center" marginTop="2rem">
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={2} lg={2} key={index} display="flex" justifyContent="center">
              <BenefitBox>
                <Typography variant="h4">{benefit.icon}</Typography>
                <Typography variant="subtitle1">{benefit.title}</Typography>
              </BenefitBox>
            </Grid>
          ))}
        </Grid>
      </Benefits>

      <FormContainer ref={formRef} marginTop="10rem">
            <Typography variant="h4" align="center" fontWeight="bold" marginTop="2rem" marginBottom="3rem">Apply for Internship/Workshop</Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
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
                label="EmailID"
                variant="outlined"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
              />
              <FormField
                fullWidth
                label="Mobile Number"
                variant="outlined"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <FormField
                fullWidth
                label="Location"
                variant="outlined"
                name="currentCity"
                value={formData.currentCity}
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
                label="Designation"
                variant="outlined"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
              />
               <FormField
                fullWidth
                select
                label="Type"
                variant="outlined"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                {type.map((type, index) => (
                  <MenuItem key={index} value={type}>{type}</MenuItem>
                ))}
              </FormField>
              <FormField
                fullWidth
                select
                label="Interested Domain"
                variant="outlined"
                name="workshopType"
                value={formData.workshopType}
                onChange={handleChange}
              >
                {workshopType.map((type, index) => (
                  <MenuItem key={index} value={type}>{type}</MenuItem>
                ))}
              </FormField>
              <FormField
                fullWidth
                label="Workshop Date"
                variant="outlined"
                name="workshopDate"
                value={formData.workshopDate}
                onChange={handleChange}
              />
              <FormField
                fullWidth
                label="Comment"
                variant="outlined"
                name="comments"
                value={formData.comments}
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
           
            <dotlottie-player
            src="https://lottie.host/21748974-2a6f-4ac0-b475-0e5fcd24469b/vhcQBoYMGt.json"
            background="transparent"
            speed="1"
            style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
            loop
            autoplay>
         </dotlottie-player>
              {/* // sx={{ width: '100%', maxWidth: '400px', height: 'auto' }} */}
           
          </Grid>
        </Grid>
      </FormContainer>

      <ToastContainer />
      <Footer />
    </Box>
  );
};

export default InternshipPage;
