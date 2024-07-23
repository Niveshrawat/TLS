import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const Filters = ({ filters, setFilters }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
      <FormControl variant="outlined" sx={{ minWidth: 100 }}>
        <InputLabel>Price</InputLabel>
        <Select
          name="price"
          value={filters.price}
          onChange={handleChange}
          label="Price"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ minWidth: 100 }}>
        <InputLabel>Duration</InputLabel>
        <Select
          name="duration"
          value={filters.duration}
          onChange={handleChange}
          label="Duration"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="short">Short</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="long">Long</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ minWidth: 100 }}>
        <InputLabel>Topic</InputLabel>
        <Select
          name="topic"
          value={filters.topic}
          onChange={handleChange}
          label="Topic"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="financial">Financial</MenuItem>
          <MenuItem value="management">Management</MenuItem>
          <MenuItem value="technical">Technical</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filters;
