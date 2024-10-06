import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const [readMore, setReadMore] = useState(false);

  // Check if course is defined and has required properties
  if (!course) {
    return <Typography color="error">Course information is not available.</Typography>;
  }

  // Log the course object to check its structure
  console.log(course,"course");

  // Destructure properties with default values
  const { title = course.title, description = 'No description available.', image = '', duration = 'N/A', _id } = course;

  const handleReadMore = () => {
    setReadMore(!readMore);
  };
  const handleViewDetails = () => {
    console.log('Navigating to course detail:', _id);
  };

  return (
    <Card 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        maxWidth: 400, 
        height: '90%',
        margin: '10px',
        marginBottom: '2rem' 
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={`https://api.thelearnskills.com/${course.photo}`}
        alt={title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" fontWeight="bold" component="div">
          {course.programName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         Price: Rs{course.price}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: '10px' }}>
          Duration: {course.durationOfProgram}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: '10px' }}>
          Rating: {course.rating}
        </Typography>
      </CardContent>
      <Box sx={{ p: 1 }}>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          component={Link} 
          to={`/courses/${_id}`} 
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
};

export default CourseCard;
