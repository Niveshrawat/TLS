import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, InputAdornment, Divider, Select } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const experienceOptions = [
  { value: '0-1 Years', label: '0-1 Years' },
  { value: '1-3 Years', label: '1-3 Years' },
  { value: '3-5 Years', label: '3-5 Years' },
  { value: '5+ Years', label: '5+ Years' },
];

const JobSearchBar = ({ onSearch }) => {
  const [experience, setExperience] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    if (typeof onSearch === 'function') {
      onSearch({ jobTitle, experience, location });
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }, // Stacks on phones, horizontal on larger screens
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: '50px',
        boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)',
        padding: { xs: '12px', sm: '18px' }, // Padding adjusts based on screen size
        maxWidth: '800px',
        margin: 'auto',
        marginTop: '2rem',
        marginBottom: '3rem',
      }}
    >
      <TextField
        variant="standard"
        placeholder="Job Title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        sx={{
          flex: 1,
          marginBottom: { xs: '8px', sm: 0 },
          marginRight: { sm: '8px' }, // Adds margin on the right for non-phone screens
          width: { xs: '100%', sm: 'auto' }, // Full width on phones
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          disableUnderline: true,
          sx: {
            borderRadius: '25px',
            paddingLeft: '10px',
            // backgroundColor: '#f5f5f5',
          },
        }}
      />

      <Divider
        orientation="vertical"
        flexItem
        sx={{
          display: { xs: 'none', sm: 'block' }, // Divider is hidden on phones
          marginX: '8px',
        }}
      />

      <Select
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        displayEmpty
        variant="standard"
        sx={{
          flex: 1,
          marginBottom: { xs: '8px', sm: 0 },
          marginRight: { sm: '8px' },
          paddingLeft: '10px',
          borderRadius: '25px',
          // backgroundColor: '#f5f5f5',
          width: { xs: '100%', sm: 'auto' },
        }}
        disableUnderline
        renderValue={(selected) => {
          if (!selected) {
            return <span style={{ color: 'gray' }}>Select Experience</span>;
          }
          return selected;
        }}
      >
        <MenuItem value="" disabled>
          Select Experience
        </MenuItem>
        {experienceOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      <Divider
        orientation="vertical"
        flexItem
        sx={{
          display: { xs: 'none', sm: 'block' },
          marginX: '8px',
        }}
      />

      <TextField
        variant="standard"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        sx={{
          flex: 1,
          marginBottom: { xs: '8px', sm: 0 },
          marginRight: { sm: '8px' },
          width: { xs: '100%', sm: 'auto' },
        }}
        InputProps={{
          disableUnderline: true,
          sx: {
            borderRadius: '25px',
            paddingLeft: '10px',
            // backgroundColor: '#f5f5f5',
          },
        }}
      />

      <Button
        variant="contained"
        color="primary"
        sx={{
          borderRadius: '50px',
          padding: '10px 20px',
          width: { xs: '100%', sm: 'auto' }, // Full width on phones
          marginTop: { xs: '8px', sm: 0 }, // Adds space on phones
        }}
        onClick={handleSearch}
      >
        Search
      </Button>
    </Box>
  );
};

export default JobSearchBar;
