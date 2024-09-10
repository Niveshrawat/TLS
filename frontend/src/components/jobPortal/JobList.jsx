import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, CircularProgress } from '@mui/material';
import JobCard from './JobCard';
import Navbar from '../header/Navbar';
import { getJobPostings } from '../../services/jobService';
import Footer from '../footer/Footer';
import JobSearchBar from './SearchBar';
import PromotionalBox from './PromotionalBox';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobPostings();
        if (response.jobPostings && Array.isArray(response.jobPostings)) {
          setJobs(response.jobPostings);
          setFilteredJobs(response.jobPostings);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load job postings');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = ({ jobTitle, experience, location }) => {
    const filtered = jobs.filter((job) => {
      return (
        (jobTitle ? job.title.toLowerCase().includes(jobTitle.toLowerCase()) : true) &&
        (experience ? job.experience === experience : true) &&
        (location ? job.location.toLowerCase().includes(location.toLowerCase()) : true)
      );
    });
    setFilteredJobs(filtered);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f5f4fa' }}>
      <Navbar />
      <Typography variant="h4" textAlign="center" marginTop="5rem" sx={{ fontWeight: 900, WebkitTextStroke: '1px black' }}>
        Discover Your Dream Job With Us
      </Typography>
      <JobSearchBar onSearch={handleSearch} />
      <PromotionalBox />
      <Typography variant="h5" textAlign="center" marginTop="5rem" sx={{ fontWeight: 900 }}>
        Top Companies Hiring Now
      </Typography>
      <Container sx={{ marginTop: '2rem' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3} justifyContent="center">
              {filteredJobs.map((job, index) => (
                <Grid item xs={12} sm={6} md={3} key={index} display="flex" justifyContent="center">
                  <JobCard job={job} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default JobList;
