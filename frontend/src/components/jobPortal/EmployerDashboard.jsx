import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import MyPostings from './MyPosting'; // Create this component
import Applications from './Application'; // Create this component
import JobPostingForm from './JobPostingForm'; // Create this component
import Navbar from '../header/Navbar';
import ChangePassword from '../user/ChangePassword';

const EmployerDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('My Postings');
  const employerName = "Employer Name"; // Replace with actual employer name

  const renderContent = () => {
    switch (selectedSection) {
      case 'My Postings':
        return <MyPostings />;
      case 'Applications':
        return <Applications />;
      case 'Job Post':
        return <JobPostingForm />;
        case 'Change Password':
        return <ChangePassword />;
      default:
        return null;
    }
  };

  return (
    <Box>
        <Navbar/>
    <Box display="flex">
      <Sidebar employerName={employerName} setSelectedSection={setSelectedSection} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: 30 }}>
        {renderContent()}
      </Box>
    </Box>
    </Box>
  );
};

export default EmployerDashboard;
