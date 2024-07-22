import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
  ArrowRight as ArrowRightIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Menu as MenuIcon
} from '@mui/icons-material';

import { useDispatch } from 'react-redux';
import {  logout } from '../redux/userSlice';
const drawerWidth = 240;

const Sidebar = ({ open, handleDrawerToggle }) => {
  const [openColleges, setOpenColleges] = useState(false);
  const [openCourses, setOpenCourses] = useState(false);
  const [openUniversity, setOpenUniversity] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen size is small
  const dispatch = useDispatch()


  const handleCollegesClick = () => {
    setOpenColleges(!openColleges);
  };

  const handleCoursesClick = () => {
    setOpenCourses(!openCourses);
  };

  const handleUniversityClick = () => {
    setOpenUniversity(!openUniversity);
  };

  const handleLogout = async() => {
     localStorage.removeItem('token');
     localStorage.removeItem('role');

    await dispatch(logout());
    navigate('/admin/login');

  }

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      anchor="left"
      open={open}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }} // Keep mounted for better performance on mobile
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      {isMobile && (
        <div style={{ textAlign: 'right', padding: '8px' }}>
          <IconButton onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        </div>
      )}
      <List>
        <ListItem button component={Link} to="/admin/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={handleCoursesClick}>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Courses" />
          {openCourses ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={openCourses} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/courses" sx={{ pl: 4 }}>
              <ListItemIcon>
                <ArrowRightIcon />
              </ListItemIcon>
              <ListItemText primary="All Short Term Courses" />
            </ListItem>
            <ListItem button component={Link} to="/short-term-lead" sx={{ pl: 4 }}>
              <ListItemIcon>
                <ArrowRightIcon />
              </ListItemIcon>
              <ListItemText primary="Short Term Leads" />
            </ListItem>
            <ListItem button component={Link} to="/long-term-course" sx={{ pl: 4 }}>
              <ListItemIcon>
                <ArrowRightIcon />
              </ListItemIcon>
              <ListItemText primary="All Long Term Courses" />
            </ListItem>
            <ListItem button component={Link} to="/long-term-lead" sx={{ pl: 4 }}>
              <ListItemIcon>
                <ArrowRightIcon />
              </ListItemIcon>
              <ListItemText primary="Long Term Leads" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button onClick={handleCollegesClick}>
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary="Colleges" />
          {openColleges ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={openColleges} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/colleges" sx={{ pl: 4 }}>
              <ListItemIcon>
                <ArrowRightIcon />
              </ListItemIcon>
              <ListItemText primary="All Colleges" />
            </ListItem>
            <ListItem button component={Link} to="/get-college" sx={{ pl: 4 }}>
              <ListItemIcon>
                <ArrowRightIcon />
              </ListItemIcon>
              <ListItemText primary="College Leads" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button component={Link} to="/industrial">
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText primary="Internship/Industry Training" />
        </ListItem>
        <ListItem button onClick={handleUniversityClick}>
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText primary="University Partnerships" />
          {openUniversity ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={openUniversity} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/university-partnership" sx={{ pl: 4 }}>
              <ListItemIcon>
                <ArrowRightIcon />
              </ListItemIcon>
              <ListItemText primary="All Universities" />
            </ListItem>
          </List>
        </Collapse>
            <ListItem button onClick={handleLogout} >
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
