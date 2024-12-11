import React, { useRef } from 'react';
import { Box, Container, AppBar, Tabs, Tab, Typography } from '@mui/material';
import CollegeDetailsBanner from './CollegeDetailBanner';
import CollegeInfo from './CollegeInfo';
import CoursesTable from './CourseTable';
import Reviews from './Review';
import AdmissionProcess from './AdmissionProcess';
import PlacementTable from './PlacementProcess';
import CollegeRankingPage from './CollegeRanking'; // Import CollegeRankingPage
import Navbar from '../header/Navbar';
import Footer from '../footer/Footer'

// Sample data for demonstration purposes


const CollegeDetailsPage = () => {

  const [value, setValue] = React.useState(0);

  const sectionsRefs = {
    0: useRef(null),
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
    4: useRef(null),
    5: useRef(null),
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    sectionsRefs[newValue].current.scrollIntoView({ behavior: 'smooth' });
  };

 

  return (
    <Box>
      <Navbar />
      <Container>
        <CollegeDetailsBanner  />
        <AppBar position="static" sx={{ backgroundColor: 'navy' }}>
          <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" textColor="inherit">
            <Tab label="College Info" />
            <Tab label="Courses" />
            <Tab label="Reviews" />
            <Tab label="Ranking" />
            <Tab label="Admission" />
            <Tab label="Placement" />
          </Tabs>
        </AppBar>
        <Box>
          <div ref={sectionsRefs[0]}>
            <CollegeInfo  />
          </div>
          <div ref={sectionsRefs[1]}>
            <CoursesTable  />
          </div>
          
          <div ref={sectionsRefs[2]} >
            <CollegeRankingPage />
          </div>
          <div ref={sectionsRefs[3]}>
            <AdmissionProcess />
          </div>
          <div ref={sectionsRefs[4]}>
            <PlacementTable />
          </div>
        </Box>
      </Container>
      <Footer/>
    </Box>
  );
};

export default CollegeDetailsPage;