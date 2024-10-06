import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Container, Card } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../header/Navbar';
import VocationalForm from '../forms/VocationalForm';
import Footer from '../footer/Footer';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CourseDetail = () => {
  const { _id } = useParams(); // Retrieves the course ID from the route
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.user); // Checks if the user is logged in
  const token = localStorage.getItem('token'); // Get token from localStorage
  console.log("Course ID:", _id); // Log the course ID

  const navigate = useNavigate();

  // Fetch course details from the backend
 useEffect(() => {
    const fetchCourse = async () => {
      if (!_id) {
        console.error('No course ID provided');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://api.thelearnskills.com/api/v1/vocationalEducation/vocational-education/${_id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        });
        
        console.log("Course data fetched:", response.data.data); // Log fetched data
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course:', error.response ? error.response.data : error.message);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [_id, token]);
  // Handle opening the enrollment form
  const handleOpenForm = () => {
    if (isLoggedIn) {
      setOpenForm(true);
    } else {
      navigate('/login');
    }
  };

  const handleCloseForm = () => setOpenForm(false);

  // Loading or error display
  if (loading) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  if (!course) {
    return <Typography variant="h4">Course not found</Typography>;
  }

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '2rem',
          padding: { xs: '1rem', md: '2rem' },
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src={`https://api.thelearnskills.com/${course.photo}`}
                alt={course.programName}
                style={{
                  width: '100%',
                  maxWidth: '500px',
                  borderRadius: '8px',
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} display="flex" flexDirection="column" justifyContent="center">
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '1.5rem', md: '2rem' },
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              {course.programName}
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: 'gray',
                textAlign: { xs: 'center', md: 'left' },
                marginBottom: '1rem',
              }}
            >
              {course.description}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Duration: {course.durationOfProgram}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
              Rating: {course.rating}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Price: ₹{course.price}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: '2rem', height: '3rem', width: '15rem', fontWeight: 'bold' }}
              fullWidth
              onClick={handleOpenForm}
            >
              Enroll Now
            </Button>
            <Button
              variant="contained"
              sx={{
                marginTop: '1rem',
                height: '3rem',
                width: '15rem',
                fontWeight: 'bold',
                backgroundColor: 'red',
                '&:hover': { backgroundColor: '#FF8080' },
              }}
              fullWidth
            >
              Pay Now
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Card sx={{ padding: '3rem', marginBottom: '2rem' }}>
              <Box id="overview" mb={4}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  About this course
                </Typography>
                <Typography sx={{ marginTop: '1.5rem', color: '#686D76' }}>
                  {course.aboutProgram}
                </Typography>
              </Box>

              <Box id="program-module" mb={4}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  What you'll learn
                </Typography>
                {course.programContents?.map((module, index) => (
                  <Typography key={index} sx={{ marginTop: '0.5rem', color: '#686D76' }}>
                    {module.ModuleName}
                  </Typography>
                ))}
              </Box>

              <Box id="eligibility" mb={4}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Eligibility
                </Typography>
                {course.whoShouldAttend?.map((item, index) => (
                  <Typography key={index} sx={{ marginTop: '0.5rem', color: '#686D76' }}>
                     → {item}
                  </Typography>
                ))}
              </Box>

              <Box id="admission-criteria" mb={4}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Admission Criteria
                </Typography>
                {course.admissionCriteria?.map((item, index) => (
                  <Typography key={index} sx={{ marginTop: '0.5rem', color: '#686D76' }}>
                    → {item}
                  </Typography>
                //   <ul>
                //   {program.whoShouldAttend.map((attendee, index) => (
                //     <li key={index}>{attendee}</li>
                //   ))}
                // </ul>
                ))}
              </Box>

              <Box id="job-roles" mb={4}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Job Roles
                </Typography>
                {course.jobRoles?.map((role, index) => (
                  <Typography key={index} sx={{ marginTop: '0.5rem', color: '#686D76' }}>
                    → {role}
                  </Typography>
                ))}
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: { xs: 'none', md: 'block' },
                padding: '1rem',
                backgroundColor: 'white',
                boxShadow: '0px 0px 10px navy',
                position: 'sticky',
                top: '10rem',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                {course.programName}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
                🕒 Duration: {course.durationOfProgram}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
              <CurrencyRupeeIcon sx={{ fontSize: 20, color: '#FFAF45' }} />
              Price: Rs.{course.price} 
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
                ⌛ Time: {course.programAndClassSchedule}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
                🕒 Age: {course.minAgeLimit}+
              </Typography>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ fontWeight: 'bold', marginTop: '2rem' }}
                onClick={handleOpenForm}
              >
                Enroll Now
              </Button>
            </Box>
          </Grid>
        </Grid>

      </Container>
      <Box
  sx={{
    marginTop: '2rem',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem',
  }}
>
  <Box
    component="img"
    src={`https://api.thelearnskills.com/${course.certificateImage}`}
    sx={{
      width: {
        xs: '15rem', // Width for extra small screens (phones)
        sm: '24rem', // Width for small screens (tablets)
        md: '30rem', // Width for medium screens (small laptops)
        lg: '40rem', // Width for large screens (desktops)
      },
      height: {
        xs: '10rem', // Height for extra small screens (phones)
        sm: '16rem', // Height for small screens (tablets)
        md: '20rem', // Height for medium screens (small laptops)
        lg: '30rem', // Height for large screens (desktops)
      },
      marginRight:{
        xs: '3rem', // Height for extra small screens (phones)

      }
    }}
  />
</Box>

      <VocationalForm open={openForm} handleClose={handleCloseForm} courseName={course.programName} />
      <Footer />
    </Box>
  );
};

export default CourseDetail;
