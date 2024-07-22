import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const CourseForm = ({ formData, handleChange, handleImageChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Course Name"
        name="courseName"
        value={formData.courseName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Highlights"
        name="highlights"
        value={formData.highlights}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Criteria"
        name="criteria"
        value={formData.criteria}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        name="price"
        value={formData.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Duration"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <input
        type="file"
        multiple
        onChange={handleImageChange}
        accept="image/*"
        style={{ marginTop: '1rem' }}
      />
      {/* <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box> */}
    </form>
  );
};

export default CourseForm;
