// import React, { useState } from 'react';
// import { Box, Checkbox, FormControlLabel, FormGroup, Typography, Accordion, AccordionSummary, AccordionDetails, Drawer, Button, IconButton } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import LocationCityIcon from '@mui/icons-material/LocationCity';
// import SchoolIcon from '@mui/icons-material/School';
// import PublicIcon from '@mui/icons-material/Public';
// import SettingsIcon from '@mui/icons-material/Settings';
// import ExploreIcon from '@mui/icons-material/Explore';
// import FilterListIcon from '@mui/icons-material/FilterList';

// const FilterSidebar = ({ filters, handleFilterChange }) => {
//   const [selectedState, setSelectedState] = useState('');
//   const [degreeCollapsed, setDegreeCollapsed] = useState(true);
//   const [stateCollapsed, setStateCollapsed] = useState(true);
//   const [cityCollapsed, setCityCollapsed] = useState(true);
//   const [courseCollapsed, setCourseCollapsed] = useState(true);
//   const [modeCollapsed, setModeCollapsed] = useState(true);
//   const [typeCollapsed, setTypeCollapsed] = useState(true);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const states = [
//     { name: 'Uttar Pradesh', cities: ['Lucknow', 'Kanpur', 'Varanasi','Noida'] },
//     { name: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur'] },
//     // Add more states and cities here
//   ];

//   const courses = ['Course1', 'Course2'];
//   const studyModes = ['Online', 'Offline'];
//   const instituteTypes = ['Public', 'Private'];

//   const handleStateChange = (state) => {
//     setSelectedState(state);
//     handleFilterChange('state', state);
//     handleFilterChange('city', ''); // Reset city when state changes
//   };

//   const drawer = (
//     <Box sx={{ width: 350, padding: 2, marginLeft:'-2rem', marginTop:'2rem' }}>
//       {/* Degree */}
//       <Accordion expanded={!degreeCollapsed} onChange={() => setDegreeCollapsed(!degreeCollapsed)} sx={{ borderRadius: 4, marginBottom: 2 }}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
//           <Typography variant="subtitle1"><SchoolIcon /> Degree</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <FormGroup>
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={filters.degree === 'Graduate'}
//                   onChange={() => handleFilterChange('degree', 'Graduate')}
//                 />
//               }
//               label="Graduate"
//             />
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={filters.degree === 'Postgraduate'}
//                   onChange={() => handleFilterChange('degree', 'Postgraduate')}
//                 />
//               }
//               label="Postgraduate"
//             />
//           </FormGroup>
//         </AccordionDetails>
//       </Accordion>

//       {/* States */}
//       <Accordion expanded={!stateCollapsed} onChange={() => setStateCollapsed(!stateCollapsed)} sx={{ borderRadius: 4, marginBottom: 2 }}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content">
//           <Typography variant="subtitle1"><ExploreIcon /> States</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <FormGroup>
//             {states.map((state) => (
//               <FormControlLabel
//                 key={state.name}
//                 control={
//                   <Checkbox
//                     checked={filters.state === state.name}
//                     onChange={() => handleStateChange(state.name)}
//                   />
//                 }
//                 label={state.name}
//               />
//             ))}
//           </FormGroup>
//         </AccordionDetails>
//       </Accordion>

//       {/* City */}
//       <Accordion expanded={!cityCollapsed} onChange={() => setCityCollapsed(!cityCollapsed)} sx={{ borderRadius: 4, marginBottom: 2 }}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content">
//           <Typography variant="subtitle1"><LocationCityIcon /> City</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <FormGroup>
//             {states
//               .find((state) => state.name === selectedState)
//               ?.cities.map((city) => (
//                 <FormControlLabel
//                   key={city}
//                   control={
//                     <Checkbox
//                       checked={filters.city === city}
//                       onChange={() => handleFilterChange('city', city)}
//                     />
//                   }
//                   label={city}
//                 />
//               ))}
//           </FormGroup>
//         </AccordionDetails>
//       </Accordion>

//       {/* Courses */}
//       <Accordion expanded={!courseCollapsed} onChange={() => setCourseCollapsed(!courseCollapsed)} sx={{ borderRadius: 4, marginBottom: 2 }}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4a-content">
//           <Typography variant="subtitle1"><SchoolIcon /> Courses</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <FormGroup>
//             {courses.map((course) => (
//               <FormControlLabel
//                 key={course}
//                 control={
//                   <Checkbox
//                     checked={filters.course === course}
//                     onChange={() => handleFilterChange('course', course)}
//                   />
//                 }
//                 label={course}
//               />
//             ))}
//           </FormGroup>
//         </AccordionDetails>
//       </Accordion>

//       {/* Study Mode */}
//       <Accordion expanded={!modeCollapsed} onChange={() => setModeCollapsed(!modeCollapsed)} sx={{ borderRadius: 4, marginBottom: 2 }}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5a-content">
//           <Typography variant="subtitle1"><SettingsIcon /> Study Mode</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <FormGroup>
//             {studyModes.map((mode) => (
//               <FormControlLabel
//                 key={mode}
//                 control={
//                   <Checkbox
//                     checked={filters.studyMode === mode}
//                     onChange={() => handleFilterChange('studyMode', mode)}
//                   />
//                 }
//                 label={mode}
//               />
//             ))}
//           </FormGroup>
//         </AccordionDetails>
//       </Accordion>

//       {/* Institute Type */}
//       <Accordion expanded={!typeCollapsed} onChange={() => setTypeCollapsed(!typeCollapsed)} sx={{ borderRadius: 4, marginBottom: 2 }}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel6a-content">
//           <Typography variant="subtitle1"><PublicIcon /> Institute Type</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <FormGroup>
//             {instituteTypes.map((type) => (
//               <FormControlLabel
//                 key={type}
//                 control={
//                   <Checkbox
//                     checked={filters.instituteType === type}
//                     onChange={() => handleFilterChange('instituteType', type)}
//                   />
//                 }
//                 label={type}
//               />
//             ))}
//           </FormGroup>
//         </AccordionDetails>
//       </Accordion>
//     </Box>
//   );

//   return (
//     <>
//       <Box sx={{ display: { xs: 'block', md: 'none' }, padding: 2 }}>
//         <Button variant="contained" startIcon={<FilterListIcon />} onClick={() => setMobileOpen(true)}>
//           Filters
//         </Button>
//         <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}>
//           {drawer}
//         </Drawer>
//       </Box>
//       <Box sx={{ display: { xs: 'none', md: 'block' } }}>
//         {drawer}
//       </Box>
//     </>
//   );
// };

// export default FilterSidebar;
