import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Container, Card, CardContent } from '@mui/material';
import { useParams } from 'react-router-dom';
import Navbar from '../header/Navbar';
import VocationalForm from '../forms/VocationalForm';
import Footer from '../footer/Footer';
import { useCourses } from './CourseContent';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const CourseDetail = () => {
  const { courseId } = useParams();
  const courses = useCourses(); // Assuming this hook fetches your courses
  const course = courses.find((c) => c.id === parseInt(courseId));
  const [openForm, setOpenForm] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.user); // Check if user is logged in
  const navigate = useNavigate(); // To navigate to the login page


  const handleOpenForm = () =>
  {
    if (isLoggedIn) {
   setOpenForm(true);
  } else {
    navigate('/login'); // Redirect to the login page if not logged in
  }
  } 
  const handleCloseForm = () => setOpenForm(false);

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
                src={course.image}
                alt={course.name}
                style={{
                  width: '100%',
                  maxWidth: '500px', // Controls max image size on larger screens
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
                fontSize: { xs: '1.5rem', md: '2rem' }, // Responsive font size
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              {course.title}
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
              Duration: {course.duration}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
              Rating: {course.rating}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Price: {course.price} + <Box component="span" sx={{ color: 'grey' }}>18% GST</Box>
            </Typography>

            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: '2rem', height: '3rem', width:'15rem', fontWeight: 'bold' }}
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
                width:'15rem',
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
            <Card sx={{ padding: '2rem', marginBottom: '2rem' }}>
              <Box id="overview" mb={4}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', md: '1.9rem' } }}>
                  About this course
                </Typography>
                <Typography sx={{ marginTop: '1.5rem', color: '#686D76' }}>{course.overview}</Typography>
              </Box>

              <Box id="program-module" mb={4}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', md: '1.9rem' } }}>
                  What you'll learn
                </Typography>
                {course.programModules.map((module, index) => (
                  <Typography key={index} sx={{ marginTop: '1.5rem', color: '#686D76' }}>
                    {module}
                  </Typography>
                ))}
              </Box>

              <Box id="eligibility" mb={4}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', md: '1.9rem' } }}>
                  Eligibility
                </Typography>
                {course.eligibility.map((item, index) => (
                  <Typography key={index} sx={{ marginTop: '1.5rem', color: '#686D76' }}>
                    → {item}
                  </Typography>
                ))}
              </Box>

              <Box id="admission-criteria" mb={4}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', md: '1.9rem' } }}>
                  Admission Criteria
                </Typography>
                {course.admissionCriteria.map((item, index) => (
                  <Typography key={index} sx={{ marginTop: '1.5rem', color: '#686D76' }}>
                    → {item}
                  </Typography>
                ))}
              </Box>

              <Box id="job-roles" mb={4}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', md: '1.9rem' } }}>
                  Job Roles
                </Typography>
                {course.jobRoles.map((role, index) => (
                  <Typography key={index} sx={{ marginTop: '1.5rem', color: '#686D76' }}>
                    → {role}
                  </Typography>
                ))}
              </Box>

              <Box id="age-limit" mb={4}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', md: '1.9rem' } }}>
                  Age Limit
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ marginTop: '2rem' }}>
                      <CardContent>
                        <Typography sx={{ marginTop: '1.5rem', color: '#686D76' }}>
                          Minimum Age Limit: {course.minAgeLimit}
                        </Typography>
                        <Typography sx={{ marginTop: '1.5rem', color: '#686D76' }}>
                          Maximum Age Limit: {course.maxAgeLimit}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
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
                {course.title}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
                🕒 Duration: {course.duration}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
                💲Price: {course.price} + 18% GST
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
                ⌛ Time: {course.time}
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

      <VocationalForm open={openForm} handleClose={handleCloseForm} courseName={course.title} />
      <Footer />
    </Box>
  );
};

export default CourseDetail;
