import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Dialog, DialogContent, DialogTitle } from '@mui/material';
import CollegeForm from '../forms/UnderGraduateForm';

const CollegeDetailsBanner = ({ college }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
              <img src={college.image} alt={college.name} style={{ width: '80%', borderRadius: '8px' }} />
            </Grid>
            <Grid item xs={12} sm={4} display="flex" flexDirection="column" justifyContent="center">
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {college.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {college.description}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {college.location}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {college.rating}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {college.nirfRank}
              </Typography>
              <Button variant="contained" color="primary" fullWidth onClick={handleClickOpen}>
                Apply Now
              </Button>
              <Button variant="contained" color="primary" fullWidth  sx={{  marginTop:"1rem", backgroundColor:'orangered','&:hover': {
      backgroundColor: 'lightcoral' // or any lighter shade of orangered
    }}}>
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
