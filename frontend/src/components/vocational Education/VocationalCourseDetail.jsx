import React from 'react';
import { Box, Typography, Button, Grid, Container, Card, CardContent } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useParams } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useCourses } from './CourseContent';
import Navbar from '../header/Navbar';

const CourseDetail = () => {
  const { courseId } = useParams();
  const courses = useCourses();
  const course = courses.find((c) => c.id === parseInt(courseId));

  if (!course) {
    return <Typography variant="h4">Course not found</Typography>;
  }

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          padding: '2rem',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '2rem',
          color: 'black'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <img src={course.image} alt={course.name} style={{ width: '80%', borderRadius: '8px' }} />
          </Grid>
          <Grid item xs={12} sm={4} display="flex" flexDirection="column" justifyContent="center">
            <Typography variant="h4" gutterBottom sx={{ color: 'black', fontWeight: "bold" }}>
              {course.title}
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'gray' }}>
              {course.description}
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'black', fontWeight: "bold" }}>
              🕒 Duration: {course.duration}
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'black', fontWeight: "bold" }}>
             Rating: {course.rating}
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
  💲Price: {course.price} + <Box component="span" sx={{ color: 'grey' }}>18% GST</Box>
</Typography>

            <Button variant="contained" color="primary" sx={{ height: '3.5rem', width: '12rem', fontWeight: 'bold', marginTop: '2rem' }} >
              Enroll Now
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Container>
        <Box mt={4} display="flex">
          <Box flex="1">
            
          <Box display="flex" justifyContent="space-around" mt={2} mb={4} sx={{ backgroundColor: "navy" }}>
  <ScrollLink to="overview" smooth={true}>
    <Button sx={{ color: "white" }}>Overview</Button>
  </ScrollLink>
  <ScrollLink to="program-module" smooth={true}>
    <Button sx={{ color: "white" }}>Program Module</Button>
  </ScrollLink>
  <ScrollLink to="eligibility" smooth={true}>
    <Button sx={{ color: "white" }}>Eligibility</Button>
  </ScrollLink>
  <ScrollLink to="admission-criteria" smooth={true}>
    <Button sx={{ color: "white" }}>Admission Criteria</Button>
  </ScrollLink>
  <ScrollLink to="job-roles" smooth={true}>
    <Button sx={{ color: "white" }}>Job Roles</Button>
  </ScrollLink>
  <ScrollLink to="date-fees" smooth={true}>
    <Button sx={{ color: "white" }}>Date and Fees</Button>
  </ScrollLink>
</Box>


            <Box id="overview" mb={4}>
              <Typography variant="h4" sx={{ color: 'black', fontWeight: 'bold' }}>Overview</Typography>
              <Typography sx={{ color: 'black' , marginTop:'1rem'}}>{course.overview}</Typography>
            </Box>

            <Box id="program-module" mb={4}>
              <Typography variant="h4" sx={{ color: 'black', fontWeight: 'bold' }}>Program Module</Typography>
              {course.programModules.map((module, index) => (
                <Typography key={index} sx={{ color: 'black' , marginTop:'1rem'}}>→ {module}</Typography>
              ))}
            </Box>

            <Box id="eligibility" mb={4}>
              <Typography variant="h4" sx={{ color: 'black', fontWeight: 'bold' }}>Eligibility</Typography>
              {course.eligibility.map((item, index) => (
                <Typography key={index} sx={{ color: 'black', marginTop:'1rem' }}>→ {item}</Typography>
              ))}
            </Box>

            <Box id="admission-criteria" mb={4}>
  <Typography variant="h4" sx={{ color: 'black', fontWeight: 'bold' }}>Admission Criteria</Typography>
  {course.admissionCriteria.map((item, index) => (
    <Typography key={index} sx={{ color: 'black', marginTop: '1rem' }}>
      <Box component="span" sx={{ color: 'blue', fontWeight: 'bold', fontSize:'1.5rem' }}>→</Box> {item}
    </Typography>
  ))}
</Box>


            <Box id="job-roles" mb={4}>
              <Typography variant="h4" sx={{ color: 'black', fontWeight: 'bold' }}>Job Roles</Typography>
              {course.jobRoles.map((role, index) => (
                <Typography key={index} sx={{ color: 'black', marginTop:'1rem' }}>→ {role}</Typography>
              ))}
            </Box>

            <Box id="date-fees" mb={4}>
              <Typography variant="h4" sx={{ color: 'black', fontWeight: 'bold' }}>Date and Fees</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="body2" sx={{ color: 'black', marginTop:'1rem' }}>Total Price: ₹{course.totalPrice}</Typography>
                      <Typography variant="body2" sx={{ color: 'black', marginTop:'1rem' }}>GST: ₹{course.gst}</Typography>
                      <Typography variant="body2" sx={{ color: 'black', marginTop:'1rem' }}>Total Price with GST: ₹{course.totalPriceWithGst}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="body2" sx={{ color: 'black' , marginTop:'1rem'}}>Application Deadline Date: {course.applicationDeadlineDate}</Typography>
                      <Typography variant="body2" sx={{ color: 'black', marginTop:'1rem' }}>Programme Start Date: {course.programStartDate}</Typography>
                      <Typography variant="body2" sx={{ color: 'black' , marginTop:'1rem'}}>Programme End Date: {course.programEndDate}</Typography>
                    </CardContent>
                  </Card>
                  
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              width: { xs: '100%', md: '400px' },
              height: 'fit-content',
              padding: '1rem',
              backgroundColor: 'white',
              boxShadow: '0px 0px 10px navy',
              position: 'sticky',
              top: '2rem',
              marginLeft: { xs: '0', md: '6rem' },
              marginRight: { xs: '0', md: '6rem' }
            }}
          >
            <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold', marginBottom: '1rem' }}>
              {course.title}
            </Typography>
            <Typography variant="body1" sx={{ color: 'black', marginBottom: '1rem' }}>
              🕒 Duration: {course.duration}
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: 'black', marginBottom:'1rem' }}>
  💲Price: {course.price} + <Box component="span" sx={{ color: 'grey' }}>18% GST</Box>
</Typography>

            <Typography variant="body1" sx={{ color: 'black', marginBottom: '1rem' }}>
            ⌛ Start From: {course.programStartDate}
            </Typography>
            <Button variant="contained" color="primary" fullWidth sx={{ fontWeight: 'bold', marginTop:'2rem', marginBottom:'1rem' }}>
              Enroll Now
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CourseDetail;
