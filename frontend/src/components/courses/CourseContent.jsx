import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';

function CourseCard({ course }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/course/${course.id}`);
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={course.image}
        alt={course.title}
      />
      <CardContent>
        <Typography variant="h6">{course.title}</Typography>
        <Typography variant="body2" color="text.secondary">{course.description}</Typography>
        <Typography variant="body2" color="text.secondary">Price: ${course.price}</Typography>
        <Typography variant="body2" color="text.secondary">Duration: {course.duration}</Typography>
        <Box display="flex" alignItems="center">
          <StarIcon color="primary" />
          <Typography variant="body2" color="text.secondary">{course.rating}</Typography>
        </Box>
        <Button onClick={handleViewDetails} variant="contained" color="primary" style={{ marginTop: '1rem' }}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}

export default CourseCard;
