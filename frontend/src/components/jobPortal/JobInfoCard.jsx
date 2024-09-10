import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import SkillsOutlinedIcon from '@mui/icons-material/StarOutlineOutlined'; // Replace with appropriate skill icon

const JobInfoCard = ({ job }) => {
  return (
    <Card sx={{display: { xs: 'none', md: 'block' }, boxShadow: 3, borderRadius: 2, p: 3, width: 300, height: 'auto', backgroundColor:'#EEF7FF' }}>
        <Typography variant="h6" component="div" fontWeight="bold">
            Job Description
        </Typography>
      <CardContent>
      <Box display="flex" flexDirection="column" alignItems="start" mb={2} mt={4}>
  <Box display="flex" alignItems="center">
    <WorkOutlineOutlinedIcon sx={{ color: '#003285' }} />
    <Typography variant="body1" ml={1} fontWeight="bold">
      Job Title
    </Typography>
  </Box>
  <Typography variant="body1" ml={4} color="gray">
    {job.title}
  </Typography>
</Box>

        <Box display="flex" flexDirection="column" alignItems="start" mb={2} mt={4}>
        <Box display="flex" alignItems="center">

          <CurrencyRupeeOutlinedIcon sx={{ color: 'green' }} />
          <Typography variant="body1" ml={1} fontWeight="bold">
            Salary Range
          </Typography>

          </Box>
          <Typography variant="body1" ml={4} color="gray">
            {job.salaryRange}
          </Typography>
        </Box>

        <Box display="flex" flexDirection="column" alignItems="start" mb={2} mt={4}>
        <Box display="flex" alignItems="center">

          <UpdateOutlinedIcon sx={{ color: 'gold' }} />
          <Typography variant="body1" ml={1} fontWeight="bold">
            Last Date
          </Typography>
          </Box>
          <Typography variant="body1" ml={4}>
            {new Date(job.applicationLastDate).toLocaleDateString()}
          </Typography>
        </Box>

        <Box display="flex" flexDirection="column" alignItems="start" mb={2} mt={4}>
            <Box display="flex" alignItems="center">
          <LocationOnOutlinedIcon sx={{ color: 'red' }} />
          <Typography variant="body1" ml={1} fontWeight="bold">
            Location
          </Typography>
          </Box>
          <Typography variant="body1" ml={4}>
            {job.location}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="start" mb={2} mt={4}>
            <Box display="flex" alignItems="center">
          <SkillsOutlinedIcon sx={{ color: '#003285' }} />
          <Typography variant="body1" ml={1} fontWeight="bold">
            Skills
          </Typography>
          </Box>
         
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {job.skills.map((skill, index) => (
            <Typography key={index} variant="body2" sx={{ backgroundColor: '#f0f0f0', padding: '2px 8px', borderRadius: '4px' }}>
              {skill}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobInfoCard;
