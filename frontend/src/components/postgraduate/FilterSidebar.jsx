import React, { useState } from 'react';
import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';

const FilterSidebar = ({ filters, handleFilterChange }) => {
  const [selectedState, setSelectedState] = useState('');

  const states = [
    { name: 'Uttar Pradesh', cities: ['Lucknow', 'Kanpur', 'Varanasi'] },
    { name: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur'] },
    // Add more states and cities here
  ];

  const courses = ['Course1', 'Course2'];
  const studyModes = ['Online', 'Offline'];
  const instituteTypes = ['Public', 'Private'];

  const handleStateChange = (state) => {
    setSelectedState(state);
    handleFilterChange('state', state);
    handleFilterChange('city', ''); // Reset city when state changes
  };

  return (
    <Box sx={{ width: 350, padding: 4}}>
      <Box sx={{ marginBottom: 2, padding: 1, border: '1px solid #ccc', borderRadius: 1, maxHeight: 500, overflowY: 'auto' }}>
        <Typography variant="subtitle1" gutterBottom>State</Typography>
        <FormGroup>
          {states.map((state) => (
            <FormControlLabel
              key={state.name}
              control={
                <Checkbox
                  checked={filters.state === state.name}
                  onChange={() => handleStateChange(state.name)}
                />
              }
              label={state.name}
            />
          ))}
        </FormGroup>
      </Box>

      <Box sx={{ marginBottom: 2, padding: 1, border: '1px solid #ccc', borderRadius: 1, maxHeight: 200, overflowY: 'auto' }}>
        <Typography variant="subtitle1" gutterBottom>City</Typography>
        <FormGroup>
          {states
            .find((state) => state.name === selectedState)
            ?.cities.map((city) => (
              <FormControlLabel
                key={city}
                control={
                  <Checkbox
                    checked={filters.city === city}
                    onChange={() => handleFilterChange('city', city)}
                  />
                }
                label={city}
              />
            ))}
        </FormGroup>
      </Box>

      <Box sx={{ marginBottom: 2, padding: 1, border: '1px solid #ccc', borderRadius: 1, maxHeight: 200, overflowY: 'auto' }}>
        <Typography variant="subtitle1" gutterBottom>Course</Typography>
        <FormGroup>
          {courses.map((course) => (
            <FormControlLabel
              key={course}
              control={
                <Checkbox
                  checked={filters.course === course}
                  onChange={() => handleFilterChange('course', course)}
                />
              }
              label={course}
            />
          ))}
        </FormGroup>
      </Box>

      <Box sx={{ marginBottom: 2, padding: 3, border: '1px solid #ccc', borderRadius: 1, maxHeight: 300, overflowY: 'auto' }}>
        <Typography variant="subtitle1" gutterBottom>Study Mode</Typography>
        <FormGroup>
          {studyModes.map((mode) => (
            <FormControlLabel
              key={mode}
              control={
                <Checkbox
                  checked={filters.studyMode === mode}
                  onChange={() => handleFilterChange('studyMode', mode)}
                />
              }
              label={mode}
            />
          ))}
        </FormGroup>
      </Box>

      <Box sx={{ marginBottom: 2, padding: 1, border: '1px solid #ccc', borderRadius: 1, maxHeight: 200, overflowY: 'auto' }}>
        <Typography variant="subtitle1" gutterBottom>Institute Type</Typography>
        <FormGroup>
          {instituteTypes.map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  checked={filters.instituteType === type}
                  onChange={() => handleFilterChange('instituteType', type)}
                />
              }
              label={type}
            />
          ))}
        </FormGroup>
      </Box>
    </Box>
  );
};

export default FilterSidebar;
