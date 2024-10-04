
// CollegeCard.js
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CollegeCard = ({  course }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardMedia
      component="img"
      height="200"
      image={course.image}
      alt={name}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h6" fontWeight="bold" component="div">
        {course.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {course.description}
      </Typography>
      <Box mt={1}>
        <Typography variant="body2" color="text.secondary">
          {course.duration}
        </Typography>
      </Box>
    </CardContent>
    <Box sx={{ p: 2, width: '15rem' }}>
      <Button 
        variant="contained" 
        fullWidth
        component={Link}
        to={`/courses/${course.id}`}  // Navigate based on course ID
      >
        View Details
      </Button>
    </Box>
  </Card>
);

export default CollegeCard;
