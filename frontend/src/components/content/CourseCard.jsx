import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <Card 
      sx={{ 
        height: 400, // Set a consistent height for all cards
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', 
        border: "1px solid lightgray",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
        borderRadius: "16px",
        '&:hover': {
          transform: 'scale(1.0)',
          boxShadow: 6,
        }
        
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={`https://api.thelearnskills.com/${course.image}`}
        alt={course.courseName}
        
      />
      <CardContent 
        sx={{ 
          flexGrow: 1, 
         
        }}
      >
        <Typography 
          gutterBottom 
          variant="h6" 
          fontWeight="bold" 
          component="div"
        >
          {course.courseName}
        </Typography>
        <Box mt={1}>
          <Typography variant="body2" color="text.secondary">
            Duration: {course.duration}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating: {course.rating}⭐
          </Typography>
        </Box>
      </CardContent>
      <Box sx={{  p: 1, width: '15rem' }}>
        <Button 
          variant="contained" 
          fullWidth
          component={Link}
          to={`/course/${course._id}`} // Navigate based on course ID
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
};

export default CourseCard;
