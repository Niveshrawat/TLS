import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, IconButton, useMediaQuery, Drawer, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import FilterSidebar from './FilterSidebar';
import FilterListIcon from '@mui/icons-material/FilterList';
import CollegeCard from './UnderGraduateCard';
import Navbar from '../header/Navbar';
import Footer from '../footer/Footer';
import axios from 'axios';

const UnderGraduate = () => {
  const [colleges, setColleges] = useState([]);
  const [filters, setFilters] = useState({
    state: '',
    city: '',
    course: '',
    studyMode: '',
    instituteType: '',
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get('https://api.thelearnskills.com/api/v1/college/colleges');
        setColleges(response.data); // Assuming the response contains the array of colleges directly
      } catch (error) {
        console.error("Error fetching college data", error);
      }
    };
    fetchColleges();
  }, []);

  const handleFilterChange = (filter, value) => {
    setFilters({
      ...filters,
      [filter]: value,
    });
  };

  const filteredColleges = colleges.filter((college) => {
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
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
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
            fontSize: { xs: '1.5rem', sm: '2rem' },
            textAlign: { xs: 'center', sm: 'left' },
            marginRight:{sm:'0',xs:'2rem' },
            marginBottom: { xs: 2, sm: 0 },
          }}
        >
          Universities - "Where Futures Begin"
        </Typography>
      </Box>
      <Container sx={{ maxWidth: '100%' }}>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle} sx={{ mb: 2 }}>
            <FilterListIcon />
          </IconButton>
        )}
        <Box sx={{ display: 'flex', marginTop: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
          {!isMobile && <FilterSidebar filters={filters} handleFilterChange={handleFilterChange} />}
          <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
            <FilterSidebar filters={filters} handleFilterChange={handleFilterChange} />
          </Drawer>
          <Box sx={{ flexGrow: 1, marginLeft: { xs: '3rem', sm: '3' } }}>
            <Grid container spacing={3} justifyContent={isMobile ? 'center' : 'flex-start'}>
              {filteredColleges.map((college) => (
                <Grid item xs={12} sm={6} md={4} key={college._id}>
                  {/* <Link to={`/underGraduate/${college._id}`} style={{ textDecoration: 'none' }}> */}
                    <CollegeCard college={college} />
                  {/* </Link> */}
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
