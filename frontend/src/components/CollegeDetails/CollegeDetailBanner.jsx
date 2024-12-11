import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Grid, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'; // useParams for dynamic routing
import CollegeForm from '../forms/UnderGraduateForm';

const CollegeDetailsBanner = () => {
  const [college, setCollege] = useState(null);
  const [open, setOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const { _id } = useParams(); // Assume the route is `/colleges/:id`

  useEffect(() => {
    // Fetch college details
    const fetchCollegeDetails = async () => {
      try {
        const response = await axios.get(`https://api.thelearnskills.com/api/v1/college/colleges/${_id}`);
        setCollege(response.data);
      } catch (error) {
        console.error('Error fetching college details:', error);
      }
    };

    fetchCollegeDetails();
  }, [_id]);

  const handleClickOpen = () => {
    if (isLoggedIn) {
      setOpen(true);
    } else {
      navigate('/login');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!college) return <Typography>Loading...</Typography>;

  return (
    <>
      <Box>
        <Box
          sx={{
            padding: '2rem',
            backgroundColor: '#f5f5f5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '2rem',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <img
                src={`https://api.thelearnskills.com/${college.photos}`} // Assuming the first photo is displayed
                alt={college.name}
                style={{ width: '80%', borderRadius: '8px' }}
              />
            </Grid>
            <Grid item xs={12} sm={4} display="flex" flexDirection="column" justifyContent="center">
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {college.name}
              </Typography>
              
              <Typography variant="body1" gutterBottom>
                {college.location}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {college.rating} / 5
              </Typography>
              <Typography variant="body1" gutterBottom>
                NIRF Rank: {college.nirfRank}
              </Typography>
              <Button variant="contained" color="primary" fullWidth onClick={handleClickOpen}>
                Apply Now
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  marginTop: '1rem',
                  backgroundColor: 'orangered',
                  '&:hover': {
                    backgroundColor: 'lightcoral',
                  },
                }}
              >
                Download Brochure
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Register with us</DialogTitle>
        <DialogContent>
          <CollegeForm collegeName={college.name} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CollegeDetailsBanner;
