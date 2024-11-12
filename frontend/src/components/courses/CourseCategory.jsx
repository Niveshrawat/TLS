import React from 'react';
import CourseContent from './CourseContent';
import { Grid, Typography, Button, Box } from '@mui/material';

function CourseCategory({ title, courses }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom='1rem'>
        <Typography variant="h5" gutterBottom>{title}</Typography>
        {/* <Button variant="contained" color="primary">View More Courses</Button> */}
      </Box>
      <Grid container spacing={4}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course._id}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%', // Makes sure the box fills the height of the Grid item
                minHeight: '350px', // Set a minimum height for all course boxes
              }}
            >
              <CourseContent course={course} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default CourseCategory;
