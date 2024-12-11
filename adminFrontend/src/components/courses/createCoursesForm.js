import React from 'react';
import { TextField, Button, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';


const CourseForm = ({
  formData,
  handleChange,
  handleHighlightChange,
  addHighlight,
  removeHighlight,
  handleImageChange,
  handleSubmit,
  removeExistingImage,
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

      {/* Existing Images Preview */}
      {formData.existingImages && formData.existingImages.length > 0 && (
        <Box mt={2} mb={2}>
          <h4>Existing Images:</h4>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {formData.existingImages.map((image, index) => (
              <Box key={index} position="relative">
                <img
                  src={image} // Image URL
                  alt={`Preview ${index + 1}`}
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: 'cover',
                    borderRadius: 4,
                    border: '1px solid #ccc',
                  }}
                />
                <IconButton
                  size="small"
                  style={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    background: '#fff',
                  }}
                  onClick={() => removeExistingImage(index)}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* New Image Upload */}
      <input
        type="file"
        multiple
        onChange={handleImageChange}
        accept="image/*"
        style={{ marginTop: '1rem' }}
      />

      {/* Submit Button */}
      <Box mt={2}>
        {/* <Button type="submit" variant="contained" color="primary">
          Submit
        </Button> */}
      </Box>
    </form>
  );
};

export default CourseForm;
