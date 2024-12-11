import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CollegeForm from '../forms/UnderGraduateForm';
import { useNavigate, Link } from 'react-router-dom';


const UnderGraduateCard = ({ college }) => {
  const [open, setOpen] = useState(false);
  
    const navigate = useNavigate();
  const {name= college.name, fees= college.fees, location=college.location, course= college.course, packages =college.package, _id } = college
    const handleViewDetails = () => {
      navigate(`/underGraduate/${_id}`);
    };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card sx={{marginTop:'2rem', marginBottom: 3, display: 'flex', flexDirection: 'column', height: '400px', width:'250px'}}>
        <CardMedia
          component="img"
          sx={{ height: 200 ,flexGrow: 1}}
          image={`https://api.thelearnskills.com/${college.photos}`}
          alt={college.name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div" onClick={handleViewDetails} fontWeight="bold">
            {college.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {/* <CurrencyRupeeIcon sx={{ fontSize: 16, color: '#FFAF45' }} /> */}
            ⭐ Rating: {college.rating}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <LocationOnIcon sx={{ fontSize: 16, color: '#059212' }} />
            Location: {college.location}
          </Typography>
          <Typography variant="body1" color="textSecondary">
          🏆 Rank: {college.nirfRank}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Package: {college.package}
          </Typography> */}
        </CardContent>
        <Box sx={{ padding: 2 }}>
          <Button variant="contained" color="primary" fullWidth onClick={handleClickOpen} component={Link} to={`/underGraduate/${_id}`}>
            Apply Now
          </Button>
          
        </Box>
      </Card>

      {/* <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Register with us</DialogTitle>
        <DialogContent>
          <CollegeForm />
        </DialogContent>
      </Dialog> */}
    </>
  );
};

export default UnderGraduateCard;
