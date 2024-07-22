import React from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';

const CourseForm = ({ formData, handleChange, handleImageChange, handleSubmit }) => {
  return (
    <Paper elevation={3} style={{ padding: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        Create Course
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Course Name"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Highlight"
              name="highlights"
              value={formData.highlights}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              label="Criteria"
              name="criteria"
              value={formData.criteria}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              label="Duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              multiple
              name="images"
              onChange={handleImageChange}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid> */}
        </Grid>
      </form>
    </Paper>
  );
};

export default CourseForm;
