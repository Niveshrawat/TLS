import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, Box, Card, CardContent, Button, Grid, Tab, Tabs,Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Navbar from '../header/Navbar';
import Footer from '../footer/Footer';
import InquiryForm from '../forms/ShortCoursesForm';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function getCourseDetails(id) {
  const courses = {
    1: { id: 1, title: 'Short Term Financial Course 1', image: 'https://images.pexels.com/photos/12425927/pexels-photo-12425927.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 1', price: 100, duration: '1 month', rating: 4.5 },
    2: { id: 2, title: 'Short Term Financial Course 2', image: 'https://images.pexels.com/photos/3182755/pexels-photo-3182755.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 2', price: 150, duration: '1.5 months', rating: 4.0 },
    3: { id: 3, title: 'Short Term Financial Course 3', image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=600', description: 'Description of Course 3', price: 200, duration: '2 months', rating: 4.8 },
    
  };
  return courses[id] || {};
}

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const isLoggedIn = useSelector((state) => state.user.user); // Check if user is logged in
  const navigate = useNavigate(); // To navigate to the login page

  useEffect(() => {
    console.log("Course ID from params:", id); // Log the course ID for debugging
    const courseDetails = getCourseDetails(id);
    setCourse(courseDetails);
    console.log("Course Details after fetching:", courseDetails); // Log the course details for debugging
  }, [id]);

  const [tabValue, setTabValue] = React.useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenModal = () => {
    if (isLoggedIn) {
    setModalOpen(true);
  } else {
    navigate('/login'); // Redirect to the login page if not logged in
  }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box sx={{width:'100%', overflow:'hidden'}}>
      <Navbar />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
              <Typography variant="h6" fontWeight="bold" marginTop="1rem" gutterBottom>{course.title}</Typography>
            <Box display="flex" alignItems="center">
              {course.image && (
                <img src={course.image} alt={course.title} style={{ width: '400px', height: '300px', marginRight: '1rem', marginTop: '2rem' }} />
              )}
              <Box>
                
                
                <Typography variant="subtitle1" gutterBottom >By The Learn Skill</Typography>
                <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
                  <StarIcon color="primary" />
                  {course.rating}
                </Typography>
               
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ marginTop: "5rem", boxShadow:'0px 4px 12px navy' }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>Start Your Course</Typography>
                <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gutterBottom>
                  
                🕝 {course.duration}
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
            A course covering a comprehensive stack like the MERN (MongoDB, Express.js, React, Node.js) stack typically offers a thorough exploration of each technology's fundamentals and their integration for full-stack web development. Starting with MongoDB, learners delve into NoSQL database concepts, schema design, and data manipulation through CRUD operations. Express.js instruction follows, focusing on setting up servers, routing, middleware, and interfacing with MongoDB via libraries like Mongoose. React.js is then introduced for building dynamic user interfaces, covering components, state management, event handling, and integration with backend APIs. Node.js serves as the foundation throughout, emphasizing its event-driven architecture, asynchronous programming capabilities, and server-side JavaScript execution.

            </Typography>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={2}>
            {["Comprehensive Full-Stack Development", "MongoDB and NoSQL Fundamentals", "Express.js and API Development", "React.js for Dynamic UIs", "Node.js Server-Side Development"].map((highlight, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{backgroundColor:'navy', color:'white'}}>{index + 1}</Avatar>
                    <Typography variant="body1" ml={2}>{highlight}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel value={tabValue} index={2}>

            <Typography variant="body1" paragraph>
            Basic Programming<br></br>
             HTML/CSS<br></br>
              JavaScript Proficiency<br></br>
               Database Understanding<br></br>
                Node.js Fundamentals<br></br>
                 Git & Version Control<br></br>
                  Text Editor/IDE Proficiency            </Typography>
          </TabPanel>
        </Box>
      </Container>
      <Box sx={{
         marginTop: '2rem',
         alignItems: 'center',
         display: 'flex',
         justifyContent: 'center',
         marginBottom: '2rem',
        }}>
          <Box
    component="img"
    src="/images/Certificate.jpg"
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
