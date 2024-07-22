// src/components/CourseCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const CourseCard = ({ course }) => {
  return (
    <Card style={{ maxWidth: 345, margin: '16px' }}>
      <CardMedia
        component="img"
        height="140"
        image={course.image}
        alt={course.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.description}
        </Typography>
        <Typography variant="h6" color="text.primary">
          ₹{course.price}
        </Typography>
        <Button variant="contained" color="primary" style={{ marginTop: '8px' }}>
          Apply
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
