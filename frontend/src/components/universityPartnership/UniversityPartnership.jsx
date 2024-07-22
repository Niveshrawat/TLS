import React, { useState } from 'react';
import { Container, Typography, Grid, Button, Box } from '@mui/material';
import UniversityForm from '../forms/UniversityForm';  
import Navbar from '../header/Navbar'
import { styled } from '@mui/system';
import Footer from '../footer/Footer';



const Banner = styled(Box)(({ theme }) => ({
  backgroundColor: '#003285',
  color: 'white',
  textAlign: 'center',
  padding: theme.spacing(20, 0),
}));

const universities = [
  { name: 'AKTU University', logo: 'https://upload.wikimedia.org/wikipedia/en/9/98/Dr._A.P.J._Abdul_Kalam_Technical_University_logo.png' },
  { name: 'University 2', logo: 'https://upload.wikimedia.org/wikipedia/en/f/ff/Amity_University_logo.png' },
  { name: 'University 3', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPtmsoDCEQv_CZaBVoofzJ0MXmxlRF7h3exQ&s' },
  { name: 'University 4', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxbGRmz9MP_uzbvLtkNSW_W6z3ogudGkgeJQ&s' },
  { name: 'University 5', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL2njgAxisy386Xl0YxMFUUnoMG0R6HMGgEw&s' },
  { name: 'University 6', logo: 'https://images.shiksha.com/mediadata/images/1689075562phpuwuDTm.jpeg' },
  { name: 'University 7', logo: 'https://www.peaceme.in/wp-content/uploads/2023/08/uttaranchal-university.png' },
  { name: 'University 8', logo: 'https://upload.wikimedia.org/wikipedia/en/d/db/Uttarakhand_Technical_University_logo.png' },
];

const UniversityPartnerships = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
        <Navbar/>
        <Banner>
        <Typography variant="h3" fontWeight="bold">University Partnerships</Typography>
        <Typography variant="h5">"Embark on Your Career Journey: Where Opportunities and Ambitions Collide!"</Typography>
        {/* <Button variant="contained" color="secondary" sx={{ marginTop: 2 }} onClick={handleExploreClick}>
          Explore Internships
        </Button> */}
      </Banner>

    <Container sx={{marginTop:'2rem'}}>
      <Typography variant="h2" align="center" fontWeight='bold' gutterBottom>
        <span style={{ color: 'black' }}>University </span>
        <span style={{ color: 'green' }}>Partnerships</span>
      </Typography>
      <Typography variant="body1" align="center" gutterBottom sx={{color:'grey', fontWeight:'bold'}}>
      Global Experiences is committed to providing life-changing experiences for college students and young professionals. Our international internship programs are designed to complement students’ education and further them along their career. We are the trusted partner to a growing portfolio of more than 70 universities and academic institutions. We provide each individual student and university partner a high-quality program with a strengths-based approach to career readiness and a high level of accountability.      </Typography>
      <Grid container spacing={2} justifyContent="center" marginTop='5rem'>
        {universities.map((university, index) => (
          <Grid item xs={3} key={index}>
            <img src={university.logo} alt={university.name} style={{ width: '60%' }} />
          </Grid>
        ))}
      </Grid>
      <Box mt={10} textAlign="center" >
        {/* <Box >
          <Typography variant="h4" mt={50} fontWeight='bold' style={{ marginTop: '10rem' }}>
            Get Started
          </Typography> */}
          {/* <Typography variant="body2" style={{ marginTop: '3rem' }}>
          Get Started          </Typography> */}
        {/* </Box> */}
        <Button variant="contained" color="primary" style={{ marginTop: '4rem',width:'15rem', height:"5rem" }} onClick={handleOpen}>
          Inquire Now
        </Button>
      </Box>
      <UniversityForm open={open} handleClose={handleClose} />
    </Container>
    <Footer/>
    </Box>
  );
};

export default UniversityPartnerships;