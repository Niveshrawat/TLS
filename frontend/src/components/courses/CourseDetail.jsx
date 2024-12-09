import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import { useParams } from 'react-router-dom';
import { Typography, Container, Box, Card, CardContent, Button, Grid, Tab, Tabs, Avatar } from '@mui/material';
import Navbar from '../header/Navbar';
import Footer from '../footer/Footer';
import InquiryForm from '../forms/ShortCoursesForm';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function CourseDetails() {
  const { _id } = useParams();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({});
  const isLoggedIn = useSelector((state) => state.user.user);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  
  // Create refs for each section
  const overviewRef = useRef(null);
  const highlightsRef = useRef(null);
  const eligibilityRef = useRef(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!_id) {
        console.error("No course ID found in params.");
        setLoading(false);
        return;
      }
  
      try {
        const response = await fetch(`https://api.thelearnskills.com/api/v1/shortTermcourse/short-term-courses/${_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCourseDetails();
  }, [_id, token]);

  const [tabValue, setTabValue] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    switch (newValue) {
      case 0:
        overviewRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 1:
        highlightsRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 2:
        eligibilityRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  const handleOpenModal = () => {
    if (isLoggedIn) {
      setModalOpen(true);
    } else {
      navigate('/login');
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
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
                src={`https://api.thelearnskills.com/${course.images}`}
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
              {course.courseName}
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
              Price: ₹{course.price}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: '2rem', height: '3rem', width: '15rem', fontWeight: 'bold' }}
              fullWidth
              onClick={handleOpenModal}    
                      >
              Enroll Now
            </Button>
          
          </Grid>
        </Grid>
      </Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
          <Box mt={4}>
          <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary" centered>
            <Tab label="Overview" />
            <Tab label="Highlights" />
            <Tab label="Eligibility Criteria" />
          </Tabs>
          <Box ref={overviewRef} mt={2}>
          <Typography variant="h5" marginBottom="20px" fontWeight="bold">
            Overview
          </Typography>

            <Typography variant="body1" paragraph>
              {course.description}
            </Typography>
          </Box>
          <Box ref={highlightsRef} mt={2}>
          <Typography variant="h5"  fontWeight="bold" marginBottom="20px">
            Highlights
          </Typography>
          <Box>
          <Grid container spacing={2}>
  {course.highlights?.map((highlight, index) => (
    <Grid item xs={12} key={index}>
      <Box display="flex" alignItems="center">
        {/* Uncomment the Avatar if needed */}
        {/* <Avatar sx={{ backgroundColor: 'white', color: 'navy' }}>{index + 1}</Avatar> */}
        <Typography variant="body1" ml={2}>{highlight}</Typography>
      </Box>
    </Grid>
  ))}
</Grid>
            </Box>
          </Box>
          <Box ref={eligibilityRef} mt={2}>
          <Typography variant="h5"  fontWeight="bold" marginBottom="20px">
           Criteria
          </Typography>
            <Typography variant="body1" paragraph>
            {course.criteria}
            </Typography>
          </Box>
        </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ marginTop: "5rem", boxShadow: '0px 4px 12px navy', display:{xs:"none", md:'block'} }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom marginBottom="1rem">{course.courseName}</Typography>
                <Typography variant="body1" color="text.secondary" display="flex" alignItems="center" gutterBottom sx={{ marginBottom: '1rem' }}>
                ⌛  Duration: {course.duration}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom sx={{ marginBottom: '1rem' }}>
                <CurrencyRupeeIcon sx={{ fontSize: 20, color: '#FFAF45' }} />

                Price: ₹{course.price}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom sx={{ marginBottom: '1rem' }}>
                ⭐Rating: {course.rating}
                </Typography>
                <Button variant="contained" color="primary" fullWidth onClick={handleOpenModal}>
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

       
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
            marginRight: {
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

export default CourseDetails;
