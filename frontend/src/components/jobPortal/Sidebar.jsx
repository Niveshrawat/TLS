import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Box, List, ListItem, ListItemText, Typography, ListItemIcon } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PeopleIcon from '@mui/icons-material/People';

const Sidebar = ({ setSelectedSection }) => {
  const employer = useSelector((state) => state.employer.employer);
  const employerName = employer ? employer.name : 'Employer';
  const initial = employerName.charAt(0).toUpperCase();

  return (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        backgroundColor: '#f5f5f5',
        padding: 2,
        boxShadow: 3,
        position: 'fixed',
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar sx={{ bgcolor: '#3f51b5', width: 56, height: 56 }}>{initial}</Avatar>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Welcome, {employerName}
        </Typography>
      </Box>
      <List>
        <ListItem button onClick={() => setSelectedSection('My Postings')}>
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText primary="My Postings" />
        </ListItem>
        <ListItem button onClick={() => setSelectedSection('Applications')}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Applications" />
        </ListItem>
        <ListItem button onClick={() => setSelectedSection('Job Post')}>
          <ListItemIcon>
            <PostAddIcon />
          </ListItemIcon>
          <ListItemText primary="Job Post" />
        </ListItem>
        <ListItem button onClick={() => setSelectedSection('Change Password')}>
          <ListItemIcon>
            <PostAddIcon />
          </ListItemIcon>
          <ListItemText primary=" Change Password" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
