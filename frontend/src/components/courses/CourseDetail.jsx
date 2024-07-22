import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, Box, Card, CardContent, Button, Grid, Tab, Tabs, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import Navbar from '../header/Navbar';
import Footer from '../footer/Footer';
import InquiryForm from '../forms/ShortCoursesForm';

function getCourseDetails(id) {
  const courses = {
    1: { id: 1, title: 'Short Term Financial Course 1', image: 'https://images.pexels.com/photos/12425927/pexels-photo-12425927.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 1', price: 100, duration: '1 month', rating: 4.5 },
    2: { id: 2, title: 'Short Term Financial Course 2', image: 'https://images.pexels.com/photos/3182755/pexels-photo-3182755.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 2', price: 150, duration: '1.5 months', rating: 4.0 },
    3: { id: 3, title: 'Short Term Financial Course 3', image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 3', price: 200, duration: '2 months', rating: 4.8 },
    4: { id: 4, title: 'Short Term Tech Course 1', image: 'https://images.pexels.com/photos/3861955/pexels-photo-3861955.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 4', price: 250, duration: '2 months', rating: 4.2 },
    5: { id: 5, title: 'Short Term Tech Course 2', image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 5', price: 300, duration: '1 month', rating: 4.6 },
    6: { id: 6, title: 'Short Term Tech Course 3', image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 6', price: 400, duration: '1.5 months', rating: 4.3 },
    7: { id: 7, title: 'Short Term Management Course 1', image: 'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 7', price: 500, duration: '2 months', rating: 4.7 },
    8: { id: 8, title: 'Short Term Management Course 2', image: 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 8', price: 600, duration: '2 months', rating: 4.9 },
    9: { id: 9, title: 'Short Term Management Course 3', image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 9', price: 350, duration: '1 month', rating: 4.4 },
   10: { id: 10, title: 'Long Term Financial Course 1', image: 'https://images.pexels.com/photos/3184290/pexels-photo-3184290.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 10', price: 700, duration: '3 months', rating: 4.6 },
   11: { id: 11, title: 'Long Term Financial Course 2', image: 'https://images.pexels.com/photos/3184289/pexels-photo-3184289.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 11', price: 800, duration: '4 months', rating: 4.7 },
   12: { id: 12, title: 'Long Term Financial Course 3', image: 'https://images.pexels.com/photos/3184288/pexels-photo-3184288.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 12', price: 900, duration: '5 months', rating: 4.8 },   
  };
  return courses[id] || {};
}

function CourseDetails() {
  const { id } = useParams();
  const course = getCourseDetails(id);
  const [tabValue, setTabValue] = React.useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box>
      <Navbar />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Box display="flex" alignItems="center">
              {course.image && (
                <img src={course.image} alt={course.title} style={{ width: '400px', height: '300px', marginRight: '1rem', marginTop: '2rem' }} />
              )}
              <Box>
                <Typography variant="h4" gutterBottom>{course.title}</Typography>
                <Typography variant="subtitle1" gutterBottom>By The Learn Skill</Typography>
                <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
                  <StarIcon color="primary" />
                  {course.rating}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ marginTop: "5rem" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Start Your Course</Typography>
                <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gutterBottom>
                  <AccessTimeIcon />
                  {course.duration}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Learn from Industry Experts
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Upskill for Career Growth
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Community Support
                </Typography>
                <Button variant="contained" color="primary" fullWidth onClick={handleOpenModal}>
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary" centered>
            <Tab label="Overview" />
            <Tab label="Highlights" />
            <Tab label="Eligibility Criteria" />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <Typography variant="body1" paragraph>
              Overview content goes here...
            </Typography>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={2}>
              {["Highlight 1", "Highlight 2", "Highlight 3", "Highlight 4", "Highlight 5"].map((highlight, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Box display="flex" alignItems="center">
                    <Avatar>{index + 1}</Avatar>
                    <Typography variant="body1" ml={2}>{highlight}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <Typography variant="body1" paragraph>
              Eligibility Criteria content goes here...
            </Typography>
          </TabPanel>
        </Box>
      </Container>
      <Footer />

      <InquiryForm open={modalOpen} handleClose={handleCloseModal} />
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default CourseDetails;
