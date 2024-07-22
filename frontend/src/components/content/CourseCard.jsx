// CourseCard.js
import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Box } from '@mui/material';

const CourseCard = ({ image, title, description, price, audience }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        alt={title}
        height="140"
        image={image}
        title={title}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.primary">
          Audience: {audience}
        </Typography>
        <Typography variant="body2" color="text.primary">
          Price: {price}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Box sx={{ flexGrow: -1.5 }} />
        <Button size="small" variant="contained" color="primary">
          Enroll Now
        </Button> */}
      </CardActions>
    </Card>
  );
};

export default CourseCard;
