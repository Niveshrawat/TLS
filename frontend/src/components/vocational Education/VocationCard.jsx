import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const [readMore, setReadMore] = useState(false);

  const handleReadMore = () => {
    setReadMore(!readMore);
  };

  return (
    <Card 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        maxWidth: 400, 
        height: '90%', // Ensures cards have equal height
        margin: '10px',
        marginBottom: '2rem' 
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={course.image}
        alt={course.title}
      />
      <CardContent sx={{ flexGrow: 1 }}> {/* FlexGrow allows the content to fill remaining space */}
        <Typography gutterBottom variant="h6" fontWeight="bold" component="div">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {readMore ? course.description : `${course.description.substring(0, 60)}...`}
          <Button onClick={handleReadMore} size="small">
            {readMore ? '' : ''}
          </Button>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: '10px' }}>
          Duration: {course.duration}
        </Typography>
      </CardContent>
      <Box sx={{ p: 1 }}>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          component={Link} 
          to={`/courses/${course.id}`}
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
};

export default CourseCard;
