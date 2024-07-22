// UnderGraduate.js
import React, { useState } from 'react';
import { Box, Container, Typography, IconButton, useMediaQuery, Drawer, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import FilterSidebar from './FilterSidebar';
import FilterListIcon from '@mui/icons-material/FilterList';
import CollegeCard from './UnderGraduateCard';
import Navbar from '../header/Navbar';
import Footer from '../footer/Footer';

const collegesData = [
  { id: 1, name: 'Demo 1', location: 'Lucknow', course: 'Course1', fees: '10000', package: '5 LPA', image: 'https://images.livemint.com/img/2021/07/29/600x338/b5af6ee0-ed4d-11eb-a043-f8aaa01a1d1e_1627242083337_1627556687642.jpg' },
  { id: 2, name: 'Demo 2', location: 'Mumbai', course: 'Course2', fees: '15000', package: '6 LPA', image: 'https://images.shiksha.com/mediadata/images/articles/1663041749php0WJz5M.jpeg' },
  { id: 3, name: 'Demo 3', location: 'Noida', course: 'Course2', fees: '15000', package: '6 LPA', image: 'https://images.shiksha.com/mediadata/images/articles/1663041749php0WJz5M.jpeg' },
  // Add more colleges
];

const UnderGraduate = () => {
  const [filters, setFilters] = useState({
    state: '',
    city: '',
    course: '',
    studyMode: '',
    instituteType: '',
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          width: '100%',
          height: { xs: 'auto', sm: '200px' },
          backgroundColor: '#003285',
          color: 'white',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            textAlign: { xs: 'center', sm: 'left' },
            marginBottom: { xs: 2, sm: 0 },
          }}
        >
          Universities - "Where Futures Begin"
        </Typography>
        <dotlottie-player
          src="https://lottie.host/b3680b00-4774-45ec-b6eb-32a6582867fe/8CRTLrjwSX.json"
          background="transparent"
          speed="1"
          style={{ width: '200px', height: '200px', marginLeft: { xs: 0, sm: '15rem' }, display: { xs: 'none', sm: 'block' } }}
          loop
          autoplay
        ></dotlottie-player>
      </Box>
      <Container>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle} sx={{ mb: 2 }}>
            <FilterListIcon />
          </IconButton>
        )}
        <Box sx={{ display: 'flex', marginTop: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
          {!isMobile && <FilterSidebar filters={filters} handleFilterChange={handleFilterChange} />}
          <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
            <Box sx={{ width: 250, p: 2 }}>
              <FilterSidebar filters={filters} handleFilterChange={handleFilterChange} />
            </Box>
          </Drawer>
          <Box sx={{ flexGrow: 1, marginLeft: { xs: 0, sm: 3 } }}>
            <Grid container spacing={3}>
              {filteredColleges.map((college) => (
                <Grid item xs={12} sm={6} md={4} key={college.id}>
                  <Link to={`/underGraduate/${college.id}`} style={{ textDecoration: 'none' }}>
                    <CollegeCard college={college} />
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default UnderGraduate;
