// CollegeCard.js
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

const CollegeCard = ({ image, name, description, courses, fees }) => (
  <Card>
    <CardMedia
      component="img"
      height="140"
      image={image}
      alt={name}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
      <Box mt={2}>
        <Typography variant="body2" color="text.secondary">
          Courses: {courses.join(', ')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fees: {fees}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default CollegeCard;
