import React from 'react';
import { TextField, Button, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CourseForm = ({
  formData,
  handleChange,
  handleHighlightChange,
  addHighlight,
  removeHighlight,
  handleImageChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {/* Course Name */}
      <TextField
        label="Course Name"
        name="courseName"
        value={formData.courseName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      {/* Description */}
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      {/* Multiple Highlights */}
      {formData.highlights.map((highlight, index) => (
        <Box key={index} display="flex" alignItems="center" mb={2}>
          <TextField
            label={`Highlight ${index + 1}`}
            name="highlight"
            value={highlight}
            onChange={(e) => handleHighlightChange(e, index)}
            fullWidth
            margin="normal"
          />
          <IconButton onClick={() => removeHighlight(index)}>
            <RemoveIcon />
          </IconButton>
        </Box>
      ))}
      <Button
        type="button"
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={addHighlight}
        style={{ marginBottom: '1rem' }}
      >
        Add Highlight
      </Button>

      {/* Criteria */}
      <TextField
        label="Criteria"
        name="criteria"
        value={formData.criteria}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      {/* Price */}
      <TextField
        label="Price"
        name="price"
        value={formData.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        type="number"
      />

      {/* Duration */}
      <TextField
        label="Duration"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      {/* Rating */}
      <TextField
        label="Rating"
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        type="number"
        inputProps={{ min: 0, max: 5, step: 0.1 }}
      />

      {/* Multiple Image Upload */}
      <input
        type="file"
        multiple
        onChange={handleImageChange}
        accept="image/*"
        style={{ marginTop: '1rem' }}
      />
      
      {/* Submit Button */}
      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default CourseForm;
