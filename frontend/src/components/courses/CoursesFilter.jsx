import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function Filters({ priceRange, setPriceRange, durationRange, setDurationRange, type }) {
  const handlePriceChange = (event) => {
    const value = event.target.value.split(',').map(Number);
    setPriceRange(value);
  };

  const handleDurationChange = (event) => {
    const value = event.target.value.split(',').map(Number);
    setDurationRange(value);
  };

  const priceRanges = [
    { value: [0, 200 * 74], label: '₹0-₹14,800' },
    { value: [200 * 74, 500 * 74], label: '₹14,800-₹37,000' },
    { value: [500 * 74, 1000 * 74], label: '₹37,000-₹74,000' },
    { value: [1000 * 74, 2000 * 74], label: '₹74,000-₹1,48,000' },
  ];

  const durationRanges = type === 'short'
    ? [
        { value: [0, 1], label: '0-1 month' },
        { value: [1, 1.5], label: '1-1.5 months' },
        { value: [1.5, 2], label: '1.5-2 months' },
      ]
    : [
        { value: [2, 3], label: '2-3 months' },
        { value: [3, 4], label: '3-4 months' },
        { value: [4, 5], label: '4-5 months' },
        { value: [5, 6], label: '5-6 months' },
      ];

  return (
    <Box mb={4}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <PriceCheckIcon style={{ marginRight: '8px' }} />
          <Typography variant="h6">Filter by Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            <FormGroup>
              {priceRanges.map((range) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={priceRange[0] === range.value[0] && priceRange[1] === range.value[1]}
                      onChange={handlePriceChange}
                      value={range.value}
                    />
                  }
                  label={range.label}
                  key={range.label}
                />
              ))}
            </FormGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <AccessTimeIcon style={{ marginRight: '8px' }} />
          <Typography variant="h6">Filter by Duration</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            <FormGroup>
              {durationRanges.map((range) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={durationRange[0] === range.value[0] && durationRange[1] === range.value[1]}
                      onChange={handleDurationChange}
                      value={range.value}
                    />
                  }
                  label={range.label}
                  key={range.label}
                />
              ))}
            </FormGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default Filters;
