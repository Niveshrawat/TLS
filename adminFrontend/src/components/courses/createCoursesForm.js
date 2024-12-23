import React from 'react';
import { TextField, Button, Box, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';


const CourseForm = ({
  formData,
  handleChange,
  handleHighlightChange,
  addHighlight,
  removeHighlight,
  handleCriteriaChange,
  addCriteria,
  removeCriteria,
  handleChangeAdmissionCriteria,
  addAdmissionCriteria,
  removeAdmissionCriteria,
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

      <Box marginBottom={3}>
        <Typography variant="h6">Criteria</Typography>
        {formData.criteria.map((criteria, index) => (
          <Box key={index} display="flex" alignItems="center" mb={2}>
            <TextField
              label={`Criteria ${index + 1}`}
              value={criteria}
              onChange={(e) => handleCriteriaChange(e, index)}
              fullWidth
              margin="normal"
              required
            />
            <IconButton
              aria-label="Remove criteria"
              onClick={() => removeCriteria(index)}
            >
              <RemoveIcon />
            </IconButton>
          </Box>
        ))}
        <Button
          variant="contained"
          onClick={addCriteria}
          startIcon={<AddIcon />}
        >
          Add Criteria
        </Button>
      </Box>

      {/* Admission Criteria */}
      <Box marginBottom={3}>
    <Typography variant="h6">Admission Criteria</Typography>
    {formData.admissionCriteria?.map((admissionCriteria, index) => (
        <Box key={index} display="flex" alignItems="center" mb={2}>
            <TextField
                label={`Admission Criteria ${index + 1}`}
                value={admissionCriteria}
                onChange={(e) => handleChangeAdmissionCriteria(e, index)}
                fullWidth
                margin="normal"
                required
            />
            <IconButton
                aria-label="Remove admission criteria"
                onClick={() => removeAdmissionCriteria(index)}
            >
                <RemoveIcon />
            </IconButton>
        </Box>
    ))}
    <Button
        variant="contained"
        onClick={addAdmissionCriteria}
        startIcon={<AddIcon />}
    >
        Add Admission Criteria
    </Button>
</Box>


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

      {/* Existing Image Preview */}
{formData.existingImages && formData.existingImages.length > 0 && (
  <Box mt={2}>
    <Typography variant="h6">Existing Image</Typography>
    {formData.existingImages.map((img, index) => (
      <Box key={index} display="flex" alignItems="center" mt={1}>
        <img
          src={img}
          alt={`Course Image ${index + 1}`}
          style={{ width: 100, height: 100, objectFit: 'cover', marginRight: 8 }}
        />
        <IconButton onClick={() => removeExistingImage(index)}>
          <DeleteIcon color="error" />
        </IconButton>
      </Box>
    ))}
  </Box>
)}


      {/* Existing Images Preview */}
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