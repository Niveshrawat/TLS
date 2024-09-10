import React, { useState } from 'react';
import { Box, Accordion, AccordionSummary, AccordionDetails, FormControlLabel, Checkbox, Typography, FormGroup } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WorkIcon from '@mui/icons-material/Work';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Filters = ({ filters, setFilters }) => {
  const [jobTitleCollapsed, setJobTitleCollapsed] = useState(true);
  const [salaryRangeCollapsed, setSalaryRangeCollapsed] = useState(true);
  const [locationCollapsed, setLocationCollapsed] = useState(true);
  const [experienceCollapsed, setExperienceCollapsed] = useState(true);

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [filterType]: value }));
  };

  return (
    <Box sx={{ width: 350, padding: 2, marginLeft: '-4rem', marginTop: '2rem' }}>
      {/* Job Title */}
      <Accordion expanded={!jobTitleCollapsed} onChange={() => setJobTitleCollapsed(!jobTitleCollapsed)} sx={{ borderRadius: 4, marginBottom: 2,boxShadow:'#003285' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
          <Typography variant="subtitle1"><WorkIcon /> Job Title</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.jobTitle === 'Developer'}
                onChange={() => handleFilterChange('jobTitle', 'Developer')}
              />
            }
            label="Developer"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.jobTitle === 'Designer'}
                onChange={() => handleFilterChange('jobTitle', 'Designer')}
              />
            }
            label="Designer"
          />
          {/* Add more job titles as needed */}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Salary Range */}
      <Accordion expanded={!salaryRangeCollapsed} onChange={() => setSalaryRangeCollapsed(!salaryRangeCollapsed)} sx={{ borderRadius: 4, marginBottom: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content">
          <Typography variant="subtitle1"><CurrencyRupeeIcon /> Salary Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.salaryRange === '5000-10000'}
                onChange={() => handleFilterChange('salaryRange', '5000-10000')}
              />
            }
            label="₹5000-₹10000"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.salaryRange === '10000-20000'}
                onChange={() => handleFilterChange('salaryRange', '10000-20000')}
              />
            }
            label="₹10000-₹20000"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.salaryRange === '20000-30000'}
                onChange={() => handleFilterChange('salaryRange', '20000-30000')}
              />
            }
            label="₹20000-₹30000"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.salaryRange === '30000-50000'}
                onChange={() => handleFilterChange('salaryRange', '30000-50000')}
              />
            }
            label="₹30000-₹50000"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.salaryRange === '50000-more'}
                onChange={() => handleFilterChange('salaryRange', '50000-more')}
              />
            }
            label="₹50000-more"
          />
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Location */}
      <Accordion expanded={!locationCollapsed} onChange={() => setLocationCollapsed(!locationCollapsed)} sx={{ borderRadius: 4, marginBottom: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content">
          <Typography variant="subtitle1"><LocationOnIcon /> Location</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.location === 'Delhi'}
                onChange={() => handleFilterChange('location', 'Delhi')}
              />
            }
            label="Delhi"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.location === 'Noida'}
                onChange={() => handleFilterChange('location', 'Noida')}
              />
            }
            label="Noida"
          />
          {/* Add more locations as needed */}
        </AccordionDetails>
      </Accordion>

      {/* Experience */}
      <Accordion expanded={!experienceCollapsed} onChange={() => setExperienceCollapsed(!experienceCollapsed)} sx={{ borderRadius: 4, marginBottom: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4a-content">
          <Typography variant="subtitle1"><AccessTimeIcon /> Experience</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.experience === '1'}
                onChange={() => handleFilterChange('experience', '1')}
              />
            }
            label="1 Year"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.experience === '2'}
                onChange={() => handleFilterChange('experience', '2')}
              />
            }
            label="2 Years"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.experience === '3'}
                onChange={() => handleFilterChange('experience', '3')}
              />
            }
            label="3 Years"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.experience === '4'}
                onChange={() => handleFilterChange('experience', '4')}
              />
            }
            label="4 Years"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.experience === '5'}
                onChange={() => handleFilterChange('experience', '5')}
              />
            }
            label="5 Years"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.experience === 'more'}
                onChange={() => handleFilterChange('experience', 'more')}
              />
            }
            label="More than 5 Years"
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Filters;
