import React, { useState } from 'react';
import { Box, TextField, Container,Typography } from '@mui/material';
import FilterSidebar from './FilterSidebar';
import CollegeList from './CollegeList';
import Navbar from '../header/Navbar';
import Banner from '../header/Banner';
import Footer from '../footer/Footer';
// import CollegeHeader from './CollegeHeader';

const collegesData = [
  { id: 1, name: 'MGM College', location: 'Lucknow', course: 'Course1', fees: '10000', package: '5 LPA', image: 'https://images.livemint.com/img/2021/07/29/600x338/b5af6ee0-ed4d-11eb-a043-f8aaa01a1d1e_1627242083337_1627556687642.jpg' },
  { id: 2, name: 'JSS Technical Academy', location: 'Mumbai', course: 'Course2', fees: '15000', package: '6 LPA', image: 'https://images.shiksha.com/mediadata/images/articles/1663041749php0WJz5M.jpeg' },
  // Add more colleges
];

const PostGraduate = () => {
  const [filters, setFilters] = useState({
    state: '',
    city: '',
    course: '',
    studyMode: '',
    instituteType: '',
  });

  const handleFilterChange = (filter, value) => {
    setFilters({
      ...filters,
      [filter]: value,
    });
  };

  const filteredColleges = collegesData.filter((college) => {
    return (
      (!filters.state || college.location.includes(filters.state)) &&
      (!filters.city || college.location.includes(filters.city)) &&
      (!filters.course || college.course === filters.course) &&
      (!filters.studyMode || college.studyMode === filters.studyMode) &&
      (!filters.instituteType || college.instituteType === filters.instituteType)
    );
  });

  return (
    <Box>
       <Navbar backgroundColor="#EEF7FF" color='black' />
      <Box
      sx={{
        width: '100%',
        height: '400px',
        backgroundColor: '#EEF7FF', // Replace with your image URL
        color:'white',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
       <Typography variant="h2" sx={{ color: 'black' }}>
      Postgraduate Colleges
      </Typography>

       <dotlottie-player
    src="https://lottie.host/b3680b00-4774-45ec-b6eb-32a6582867fe/8CRTLrjwSX.json"
    background="transparent"
    speed="1"
    style={{ width: '450px', height: '450px', marginLeft:'15rem' }}
    loop
    autoplay
  ></dotlottie-player>

     
    </Box>
    <Container>
      {/* <CollegeHeader /> */}
      <Box sx={{ display: 'flex', marginTop: 3, marginLeft:-25 }}>
        <FilterSidebar filters={filters} handleFilterChange={handleFilterChange} />
        <Box sx={{ flexGrow: 1, marginLeft: 3 }}>
          {/* <TextField
            label="Search College"
            variant="outlined"
            fullWidth
            margin="normal"
          /> */}
          <CollegeList colleges={filteredColleges} />
        </Box>
      </Box>
    </Container>
    <Footer/>
    </Box>
  );
};

export default PostGraduate;
