import React from 'react';
import CourseContent from './CourseContent';
import { Grid, Typography, Button, Box } from '@mui/material';

function CourseCategory({ title, courses }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom='1rem'>
        <Typography variant="h5" gutterBottom>{title}</Typography>
        <Button variant="contained" color="primary">View More Courses</Button>
      </Box>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseContent course={course} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default CourseCategory;
