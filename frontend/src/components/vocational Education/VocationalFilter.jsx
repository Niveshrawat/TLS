import React, { useState } from 'react';
import {
  Box, Checkbox, FormControlLabel, FormGroup, Typography, Accordion,
  AccordionSummary, AccordionDetails, Drawer, Button, IconButton, FormControl,
  InputLabel, Select, MenuItem
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';

const Filters = ({ filters, setFilters }) => {
  const [priceCollapsed, setPriceCollapsed] = useState(true);
  const [durationCollapsed, setDurationCollapsed] = useState(true);
  const [topicCollapsed, setTopicCollapsed] = useState(true);
  
  const handleDropdownChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
     <Accordion expanded={!priceCollapsed} onChange={() => setPriceCollapsed(!priceCollapsed)} sx={{ borderRadius: 4, marginBottom: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content">
          <Typography variant="subtitle1">Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl variant="outlined" sx={{ minWidth: 100 }}>
            {/* <InputLabel>Price</InputLabel> */}
            <Select
              name="price"
              value={filters.price}
              onChange={handleDropdownChange}
              label="Price"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={!durationCollapsed} onChange={() => setDurationCollapsed(!durationCollapsed)} sx={{ borderRadius: 4, marginBottom: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4a-content">
          <Typography variant="subtitle1">Duration</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl variant="outlined" sx={{ minWidth: 100 }}>
            {/* <InputLabel>Duration</InputLabel> */}
            <Select
              name="duration"
              value={filters.duration}
              onChange={handleDropdownChange}
              label="Duration"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="short">Short</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="long">Long</MenuItem>
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>


      <Accordion expanded={!topicCollapsed} onChange={() => setTopicCollapsed(!topicCollapsed)} sx={{ borderRadius: 4, marginBottom: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5a-content">
          <Typography variant="subtitle1">Topic</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl variant="outlined" sx={{ minWidth: 100 }}>
            {/* <InputLabel>Topic</InputLabel> */}
            <Select
              name="topic"
              value={filters.topic}
              onChange={handleDropdownChange}
              label="Topic"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="financial">Financial</MenuItem>
              <MenuItem value="management">Management</MenuItem>
              <MenuItem value="technical">Technical</MenuItem>
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Filters;
