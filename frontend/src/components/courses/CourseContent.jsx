import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';

function CourseCard({ course }) {
  const navigate = useNavigate();

  const { title = course.title, description = 'No description available.', image = '', duration = 'N/A', _id } = course;

  const handleViewDetails = () => {
    console.log('Navigating to course detail:', _id);
  };

  return (
    <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between', // Ensures even spacing within the card
      height: '100%', // Makes sure the card takes up the full height of the parent Box
    }}>
      <CardMedia
        component="img"
        height="140"
        image={`http://localhost:8080/${course.images}`}
        alt={course.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{course.courseName}</Typography>
        <Typography variant="body2" color="text.secondary">Price: ₹{course.price}</Typography>
        <Typography variant="body2" color="text.secondary">Duration: {course.duration}</Typography>
        <Box display="flex" alignItems="center">
    
          <Typography variant="body2" color="text.secondary">Rating:{course.rating}</Typography>
        </Box>
        <Button onClick={handleViewDetails} variant="contained" color="primary" component={Link} 
          to={`/course/${_id}`}  style={{ marginTop: '1rem' }}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}

export default CourseCard;