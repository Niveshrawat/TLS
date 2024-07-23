import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const [readMore, setReadMore] = useState(false);

  const handleReadMore = () => {
    setReadMore(!readMore);
  };

  return (
    <Card style={{ maxWidth: 400, margin: '16px' }}>
      <CardMedia
        component="img"
        height="200"
        image={course.image}
        alt={course.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {readMore ? course.description : `${course.description.substring(0, 100)}...`}
          <Button onClick={handleReadMore}>
            {readMore ? 'Read Less' : 'Read More'}
          </Button>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Duration: {course.duration}
        </Typography>
        <Button variant="contained" color="primary" style={{ marginTop: '8px' }} component={Link} to={`/courses/${course.id}`}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
