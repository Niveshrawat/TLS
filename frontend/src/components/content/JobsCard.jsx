import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Button, Chip } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { useNavigate } from 'react-router-dom';
import buildingLogo from '../../../public/images/building_612194.png';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/job/${job._id}`, { state: { job } });
  };

  return (
    <Card
      sx={{
        height: 350,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: '1px solid lightgray',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '16px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        overflow: 'hidden',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      {/* Header with Job Title and Company Logo */}
      <Box
        sx={{
          position: 'relative',
          height: 120,
          background: 'linear-gradient(to bottom right, #007bff, #00d4ff)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: 60,
            height: 60,
            objectFit: 'cover',
            borderRadius: '50%',
            border: '2px solid #fff',
            backgroundColor: '#fff',
          }}
          image={buildingLogo}
          alt={`${job.companyName} logo`}
        />
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h6" fontWeight="bold">
            {job.title}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {job.companyName}
          </Typography>
        </Box>
      </Box>

      {/* Job Details */}
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          flex: 1,
          alignItems: 'center',
        }}
      >
        <Chip
          icon={<CurrencyRupeeIcon sx={{ color: 'green' }} />}
          label={job.salaryRange}
          sx={{
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            color: 'green',
            fontWeight: 500,
            px: 2,
          }}
        />
        <Chip
          icon={<LocationOnIcon sx={{ color: 'red' }} />}
          label={job.location}
          sx={{
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            color: 'red',
            fontWeight: 500,
            px: 2,
          }}
        />
        <Chip
          icon={<WorkHistoryIcon sx={{ color: 'gray' }} />}
          label={`${job.numberOfOpenings} Position${job.numberOfOpenings > 1 ? 's' : ''}`}
          sx={{
            backgroundColor: 'rgba(158, 158, 158, 0.1)',
            color: 'gray',
            fontWeight: 500,
            px: 2,
          }}
        />
      </CardContent>

      {/* Apply Button */}
      <Box
        sx={{
          p: 2,
          textAlign: 'center',
          backgroundColor: '#f7f7f7',
          borderTop: '1px solid lightgray',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            fontWeight: 'bold',
            borderRadius: '8px',
            textTransform: 'none',
          }}
          onClick={handleViewMore}
        >
          Apply Now
        </Button>
      </Box>
    </Card>
  );
};

export default JobCard;
