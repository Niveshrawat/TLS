import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/job/${job._id}`, { state: { job } }); // Use _id if that's the field name in your MongoDB documents
  };

  return (
    <Card 
      variant="outlined" 
      sx={{ 
       marginBottom: 6, 
        borderRadius: 5, 
        m: 2, 
        height: '250px', 
        border: '1px solid #ddd',
        width: '300px', 
        marginLeft: '2rem',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6,
        }
      }}
      onClick={handleViewMore}
    >
      <CardContent>
        <Typography variant="h5" component="div" fontWeight="bold">
          {job.title}
        </Typography>
        <Typography sx={{ mt: '1.5rem' }} color="text.secondary">
          {job.companyName}
        </Typography>
        <Box display="flex" alignItems="center" sx={{ mt: '1rem' }}>
          <CurrencyRupeeIcon sx={{ color: 'green' }} />
          <Typography variant="body2" component="span" ml={1}>
            {job.salaryRange}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" sx={{ mt: '1rem' }}>
          <LocationOnIcon sx={{ color: 'red' }} />
          <Typography variant="body2" component="span" ml={1}>
            {job.location}
          </Typography>
        </Box>
        
      </CardContent>
    </Card>
  );
};

export default JobCard;
