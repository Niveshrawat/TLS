import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button, Container, CircularProgress, Alert, IconButton, useMediaQuery, useTheme } from '@mui/material';
import JobCard from './JobsCard';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const JobSlider = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://api.thelearnskills.com/api/v1/job-postings/all');
        console.log('Fetched Jobs:', response.data);
        setJobs(response.data.jobPostings || []);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(err.response ? `${err.response.status}: ${err.response.statusText}` : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handlePrev = () => {
    sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: 'smooth' });
  };

  const handleNext = () => {
    sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ ml: 2 }}>Loading jobs...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">Failed to load jobs: {error}</Alert>
      </Container>
    );
  }

  // Determine the number of visible slides based on screen size
  const getVisibleSlides = () => {
    if (isSmallScreen) return 1;
    if (isMediumScreen) return 2;
    if (isLargeScreen) return 3;
    return 3;
  };

  const visibleSlides = getVisibleSlides();

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, mt: 10 }}>
        <Typography variant="h4" fontWeight="bold">Jobs</Typography>
        <Button variant="contained" component={Link} to="/jobs">View All Jobs</Button>
      </Box>

      <Box sx={{ position: 'relative' }}>
        {/* Left Arrow */}
        <IconButton
          onClick={handlePrev}
          sx={{
            position: 'absolute',
            top: '50%',
            left: isSmallScreen ? '-20px' : isMediumScreen ? '-30px' : '-40px',
            transform: 'translateY(-50%)',
            zIndex: 2,
            backgroundColor: '#fff',
            width: isSmallScreen ? '30px' : isMediumScreen ? '40px' : '50px',
            height: isSmallScreen ? '30px' : isMediumScreen ? '40px' : '50px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
        >
          <ArrowBackIos fontSize={isSmallScreen ? 'small' : 'medium'} />
        </IconButton>

        {/* Slider */}
        <Box
          ref={sliderRef}
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'scroll',
            scrollBehavior: 'smooth',
            "&::-webkit-scrollbar": { display: 'none' },
          }}
        >
          {jobs.map((job) => (
            <Box
              key={job._id || job.name}
              sx={{
                flex: `0 0 calc(100% / ${visibleSlides} - ${visibleSlides === 1 ? '16px' : '24px'})`,
                width: `calc(100% / ${visibleSlides})`,
              }}
            >
              <JobCard job={job} />
            </Box>
          ))}
        </Box>

        {/* Right Arrow */}
        <IconButton
          onClick={handleNext}
          sx={{
            position: 'absolute',
            top: '50%',
            right: isSmallScreen ? '-20px' : isMediumScreen ? '-30px' : '-40px',
            transform: 'translateY(-50%)',
            zIndex: 2,
            backgroundColor: '#fff',
            width: isSmallScreen ? '30px' : isMediumScreen ? '40px' : '50px',
            height: isSmallScreen ? '30px' : isMediumScreen ? '40px' : '50px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
        >
          <ArrowForwardIos fontSize={isSmallScreen ? 'small' : 'medium'} />
        </IconButton>
      </Box>
    </Container>
  );
};

export default JobSlider;
