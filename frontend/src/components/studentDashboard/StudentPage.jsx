import React, { useState, useEffect } from 'react';
import { Avatar, Box, Grid, Typography, List, ListItem, ListItemText, ListItemIcon, IconButton, Drawer, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import PaymentIcon from '@mui/icons-material/Payment';
import ProfileDetails from './ProfileDetail';
import Navbar from '../header/Navbar';
import { useSelector } from 'react-redux';
import Courses from './Courses';
import PaymentHistory from './PaymentHistory';
import Universities from './Universities';
import StudentApplication from './StudentApplication';
import Ticket from './Ticket'
import MeetingsCalendar from './MeetingCalender';
import TodoList from './TodoList';
import EmailIcon from '@mui/icons-material/Email';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

const StudentDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('Dashboard');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useSelector((state) => state.user); // Get user data from Redux store
  const userName = user?.name || ''; // Ensure userName is correctly set

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setDrawerOpen(false); // Close the drawer on section change
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'Dashboard':
        return (
          <Box p={3}>
            <Typography variant="h6">Manage Your Profile</Typography>
            <ProfileDetails />
          </Box>
        );
      case 'My Profile':
        return <ProfileDetails />;
      case 'Universities':
        return <Universities />;
      case 'Courses':
        return <Courses />;
      case 'Payment History':
        return <PaymentHistory />;
      case 'Job Application':
        return <StudentApplication />;
        case 'Ticket':
          return <Ticket/>;
          case 'Meeting Calender':
            return <MeetingsCalendar/>;
            case 'To Do List':
            return <TodoList/>;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <Box p={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Box position="relative">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>

              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                  },
                }}
              >
                <Box p={2}>
                  <Box mb={3} textAlign="center">
                    <Avatar
                      sx={{ width: 100, height: 100, fontSize: '2rem', margin: 'auto', bgcolor: '#003285', color: 'white' }}
                    >
                      {userName.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="h5" mt={2}>Welcome! {userName}</Typography>
                  </Box>
                  <Divider />
                  <List component="nav">
                    <ListItem button selected={selectedSection === 'My Profile'} onClick={() => handleSectionClick('My Profile')}>
                      <ListItemIcon><PersonIcon /></ListItemIcon>
                      <ListItemText primary="My Profile" />
                    </ListItem>
                    <ListItem button selected={selectedSection === 'Universities'} onClick={() => handleSectionClick('Universities')}>
                      <ListItemIcon><SchoolIcon /></ListItemIcon>
                      <ListItemText primary="Universities" />
                    </ListItem>
                    <ListItem button selected={selectedSection === 'Courses'} onClick={() => handleSectionClick('Courses')}>
                      <ListItemIcon><BookIcon /></ListItemIcon>
                      <ListItemText primary="Courses" />
                    </ListItem>
                    <ListItem button selected={selectedSection === 'Payment History'} onClick={() => handleSectionClick('Payment History')}>
                      <ListItemIcon><PaymentIcon /></ListItemIcon>
                      <ListItemText primary="Payment History" />
                    </ListItem>
                    <ListItem button selected={selectedSection === 'Job Application'} onClick={() => handleSectionClick('Job Application')}>
                      <ListItemIcon><EmailIcon /></ListItemIcon>
                      <ListItemText primary="Job Application" />
                    </ListItem>
                    <ListItem button selected={selectedSection === 'Ticket'} onClick={() => handleSectionClick('Ticket')}>
                      <ListItemIcon><LocalActivityIcon /></ListItemIcon>
                      <ListItemText primary="Ticket" />
                    </ListItem>
                    <ListItem button selected={selectedSection === 'Meeting Calender'} onClick={() => handleSectionClick('Meeting Calender')}>
                      <ListItemIcon><CalendarMonthIcon /></ListItemIcon>
                      <ListItemText primary="Meeting Calender" />
                    </ListItem>
                    <ListItem button selected={selectedSection === 'To Do List'} onClick={() => handleSectionClick('To Do List')}>
                      <ListItemIcon><FormatListNumberedIcon /></ListItemIcon>
                      <ListItemText primary="To Do List" />
                    </ListItem>
                  </List>
                </Box>
              </Drawer>

              <Box sx={{ display: { xs: 'none', md: 'block' } , boxShadow: 3, borderRadius: 2, p: 3, width: '300px', height: 'auto', backgroundColor:'#EEF7FF', position:'fixed' }}>
                <Box mb={3} textAlign="center">
                  <Avatar
                    sx={{ width: 100, height: 100, fontSize: '2rem', margin: 'auto', bgcolor: '#003285', color: 'white' }}
                  >
                    {userName.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="h5" mt={2}>Welcome! {userName}</Typography>
                </Box>
                <List component="nav">
                  <ListItem button selected={selectedSection === 'My Profile'} onClick={() => handleSectionClick('My Profile')}>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText primary="My Profile" />
                  </ListItem>
                  <ListItem button selected={selectedSection === 'Universities'} onClick={() => handleSectionClick('Universities')}>
                    <ListItemIcon><SchoolIcon /></ListItemIcon>
                    <ListItemText primary="Universities" />
                  </ListItem>
                  <ListItem button selected={selectedSection === 'Courses'} onClick={() => handleSectionClick('Courses')}>
                    <ListItemIcon><BookIcon /></ListItemIcon>
                    <ListItemText primary="Courses" />
                  </ListItem>
                  <ListItem button selected={selectedSection === 'Payment History'} onClick={() => handleSectionClick('Payment History')}>
                    <ListItemIcon><PaymentIcon /></ListItemIcon>
                    <ListItemText primary="Payment History" />
                  </ListItem>
                  <ListItem button selected={selectedSection === 'Job Application'} onClick={() => handleSectionClick('Job Application')}>
                    <ListItemIcon><EmailIcon /></ListItemIcon>
                    <ListItemText primary="Job Application" />
                  </ListItem>
                  <ListItem button selected={selectedSection === 'Ticket'} onClick={() => handleSectionClick('Ticket')}>
                    <ListItemIcon><LocalActivityIcon /></ListItemIcon>
                    <ListItemText primary="Ticket" />
                  </ListItem>
                  <ListItem button selected={selectedSection === 'Meeting Calender'} onClick={() => handleSectionClick('Meeting Calender')}>
                      <ListItemIcon><CalendarMonthIcon /></ListItemIcon>
                      <ListItemText primary="Meeting Calender" />
                    </ListItem>
                    <ListItem button selected={selectedSection === 'To Do List'} onClick={() => handleSectionClick('To Do List')}>
                      <ListItemIcon><FormatListNumberedIcon /></ListItemIcon>
                      <ListItemText primary="To Do List" />
                    </ListItem>
                </List>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            {renderContent()}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default StudentDashboard;
