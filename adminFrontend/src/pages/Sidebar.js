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
  useTheme,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  ListItemAvatar,
  Typography
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
  Menu as MenuIcon,
  MeetingRoomOutlined
} from '@mui/icons-material';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';

const drawerWidth = 240;
const collapsedWidth = 60;

const Sidebar = ({ open, handleDrawerToggle }) => {
  const [openColleges, setOpenColleges] = useState(false);
  const [openCourses, setOpenCourses] = useState(false);
  const [openUniversity, setOpenUniversity] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [openVocational, setOpenVocational] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDeskTop = useMediaQuery(theme.breakpoints.up('md')); // Define isDeskTop here
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const dispatch = useDispatch();
  const { role, user, status } = useSelector((state) => state.user);

  const handleCollegesClick = () => {
    setOpenColleges(!openColleges);
  };

  const handleCoursesClick = () => {
    setOpenCourses(!openCourses);
  };

  const handleUniversityClick = () => {
    setOpenUniversity(!openUniversity);
  };

  const handleVocationalClick =() =>{
     setOpenVocational(!openVocational)
  }

  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    await dispatch(logout());
    navigate('/admin/login');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ display: 'flex' }}>
<AppBar
  position="fixed"
  sx={{
    width: `calc(100% - ${isDeskTop ? (collapsed ? collapsedWidth : drawerWidth) : 0}px)`,
    ml: `${isDeskTop && !collapsed ? drawerWidth : 0}px`,
    backgroundColor: '#003285',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  }}
>
  <Toolbar
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      padding: isSmallScreen ? '0 8px' : '0',
    }}
  >
    {isMobile && (
      <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
        <MenuIcon />
      </IconButton>
    )}

    {isDeskTop && (
      <IconButton onClick={handleCollapseToggle} sx={{ color: 'white' }}>
        <MenuIcon />
      </IconButton>
    )}

    {/* Notification Icon */}
    <IconButton
      color="inherit"
      onClick={handleNotificationClick}
      sx={{ ml: 'auto', mr: 1 }}
    >
      <NotificationsNoneOutlinedIcon sx={{ fontSize: '2rem' }} />
    </IconButton>

    {/* Account Icon */}
    <IconButton
      color="inherit"
      onClick={handleMenuOpen}
    >
      <AccountCircleIcon sx={{ fontSize: '2rem' }} />
    </IconButton>
    
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      PaperProps={{
        style: {
          width: '20ch',
        },
      }}
    >
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </MenuItem>
    </Menu>
  </Toolbar>
</AppBar>


      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: collapsed ? collapsedWidth : drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: collapsed ? collapsedWidth : drawerWidth,
      boxSizing: 'border-box',
      backgroundColor: '#003285',
      color: 'white',
      overflowY: 'show', // Prevents scrolling, hides scrollbar
      '&::-webkit-scrollbar': {
        display: 'none', // Hides the scrollbar for WebKit-based browsers
      },
      msOverflowStyle: 'none', // Hides scrollbar in Internet Explorer and Edge
      scrollbarWidth: 'none', // Hides scrollbar in Firefox

            
          },
        }}
      >
        
        <div style={{ textAlign: 'center', padding: '16px' }}>
          <img src="/TLS_20240723_132205_0000.png" alt="Logo" style={{ height: '10rem', marginTop: '-2rem' }} />
          
        </div>
        <List sx={{ marginTop: '-2rem' }}>
          {role === 'admin' && (
            <>
              <ListItem button component={Link} to="/admin/dashboard">
                <ListItemIcon sx={{ color: 'white' }}>
                  <DashboardIcon />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Dashboard" primaryTypographyProps={{ fontWeight: 'bold' }} />}
              </ListItem>

              <ListItem button onClick={handleCoursesClick}>
                <ListItemIcon sx={{ color: 'white' }}>
                  <SchoolIcon />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Courses" primaryTypographyProps={{ fontWeight: 'bold' }} />}
                {!collapsed && (openCourses ? <ExpandLessIcon sx={{ color: 'white' }} /> : <ExpandMoreIcon sx={{ color: 'white' }} />)}
              </ListItem>

              <Collapse in={openCourses} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button component={Link} to="/courses" sx={{ pl: 4 }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                      <ArrowRightIcon />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary="All Short Term Courses" primaryTypographyProps={{ fontWeight: 'bold' }} />}
                  </ListItem>
                  <ListItem button component={Link} to="/short-term-lead" sx={{ pl: 4 }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                      <ArrowRightIcon />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary="Short Term Leads" primaryTypographyProps={{ fontWeight: 'bold' }} />}
                  </ListItem>

                  {/* <ListItem button component={Link} to="/long-term-course" sx={{ pl: 4 }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                      <ArrowRightIcon />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary="All Long Term Courses" primaryTypographyProps={{ fontWeight: 'bold' }} />}
                  </ListItem>
                  <ListItem button component={Link} to="/long-term-lead" sx={{ pl: 4 }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                      <ArrowRightIcon />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary="Long Term Leads" primaryTypographyProps={{ fontWeight: 'bold' }} />}
                  </ListItem> */}

                </List>
              </Collapse>
              <ListItem button onClick={handleCollegesClick}>
                <ListItemIcon sx={{ color: 'white' }}>
                  <BusinessIcon />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Colleges" primaryTypographyProps={{ fontWeight: 'bold' }} />}
                {!collapsed && (openColleges ? <ExpandLessIcon sx={{ color: 'white' }} /> : <ExpandMoreIcon sx={{ color: 'white' }} />)}
              </ListItem>
              <Collapse in={openColleges} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button component={Link} to="/colleges" sx={{ pl: 4 }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                      <ArrowRightIcon />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary="All Colleges" primaryTypographyProps={{ fontWeight: 'bold' }} />}
                  </ListItem>
                  <ListItem button component={Link} to="/get-college" sx={{ pl: 4 }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                      <ArrowRightIcon />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary="College Leads" primaryTypographyProps={{ fontWeight: 'bold' }} />}
                  </ListItem>
                </List>
              </Collapse>

              <ListItem button component={Link} to="/university-partnership">
                <ListItemIcon sx={{ color: 'white' }}>
                  <HandshakeOutlinedIcon />
                </ListItemIcon>

                {!collapsed && <ListItemText primary="University Partnership" primaryTypographyProps={{ fontWeight: 'bold' }} />}
              </ListItem>
              
                  
               
              

              <ListItem button component={Link} to="/industrial">
                <ListItemIcon sx={{ color: 'white' }}>
                  <WarehouseOutlinedIcon />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Internship/Industry Training" primaryTypographyProps={{ fontWeight: 'bold' }} />}
              </ListItem>

              <ListItem onClick={handleVocationalClick} >
                <ListItemIcon sx={{ color: 'white' }}>
                  <WorkIcon />
                </ListItemIcon>
              
                {!collapsed && <ListItemText primary="Vocational Education" primaryTypographyProps={{ fontWeight: 'bold' }} />}
                {!collapsed && (openVocational ? <ExpandLessIcon sx={{ color: 'white' }} /> : <ExpandMoreIcon sx={{ color: 'white' }} />)}     
                         </ListItem>

                         <Collapse in={openVocational} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button component={Link} to="/vocational-education" sx={{ pl: 4 }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                      <ArrowRightIcon />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary="Vocational Courses" primaryTypographyProps={{ fontWeight: 'bold' }} />}
                  </ListItem>
                  <ListItem button component={Link} to="/vocational-leads" sx={{ pl: 4 }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                      <ArrowRightIcon />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary="Vocational Leads" primaryTypographyProps={{ fontWeight: 'bold' }} />}
                  </ListItem>
                </List>
              </Collapse>


              <ListItem button component={Link} to="/employee-list">
              <ListItemIcon sx={{ color: 'white' }}>
                <SchoolIcon />
              </ListItemIcon>
              {!collapsed &&<ListItemText primary="Employees" primaryTypographyProps={{ fontWeight: 'bold' }} /> }
            </ListItem>

            <ListItem button component={Link} to="/job-poster">
              <ListItemIcon sx={{ color: 'white' }}>
                <WorkIcon />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Job Poster" primaryTypographyProps={{ fontWeight: 'bold' }} />}
            </ListItem>

            <ListItem button component={Link} to="/ticket">
                <ListItemIcon sx={{ color: 'white' }}>
                  <LocalActivityOutlinedIcon />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Tickets" primaryTypographyProps={{ fontWeight: 'bold' }} />}
              </ListItem>

              <ListItem button component={Link} to="/meeting">
                <ListItemIcon sx={{ color: 'white' }}>
                  <MeetingRoomOutlined />
                </ListItemIcon>

                {!collapsed && <ListItemText primary="Meeting" primaryTypographyProps={{ fontWeight: 'bold' }} />}
              </ListItem>
            </>
          )}
          {role === 'teamLeader' && (
          <>
            <ListItem button component={Link} to="/teamLeader/dashboard">
              <ListItemIcon sx={{ color: 'white' }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" primaryTypographyProps={{ fontWeight: 'bold' }} />
            </ListItem>
            <ListItem button component={Link} to="/teamLeader/short-term-leads">
              <ListItemIcon sx={{ color: 'white' }}>
                <ArrowRightIcon />
              </ListItemIcon>
              <ListItemText primary="Short Term Leads" primaryTypographyProps={{ fontWeight: 'bold' }} />
            </ListItem>
            <ListItem button component={Link} to="/teamLeader/vocational-leads" sx={{ pl: 4 }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                      <ArrowRightIcon />
                    </ListItemIcon>
                    <ListItemText primary="Vocational Leads" primaryTypographyProps={{ fontWeight: 'bold' }} />
                  </ListItem>
           
            
          </>
        )}

{role === 'caller' && (
          <>
            <ListItem button component={Link} to="/caller/dashboard">
              <ListItemIcon sx={{ color: 'white' }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" primaryTypographyProps={{ fontWeight: 'bold' }} />
            </ListItem>
            <ListItem button component={Link} to="/caller/short-term-leads">
              <ListItemIcon sx={{ color: 'white' }}>
                <ArrowRightIcon />
              </ListItemIcon>
              <ListItemText primary="Short Term Leads" primaryTypographyProps={{ fontWeight: 'bold' }} />
            </ListItem>
            <ListItem button component={Link} to="/caller/get-college" >
              <ListItemIcon sx={{ color: 'white' }}>
                      <ArrowRightIcon />
              </ListItemIcon>
            <ListItemText primary="College Leads" primaryTypographyProps={{ fontWeight: 'bold' }} />
                  </ListItem>
                  <ListItem button component={Link} to="/caller/vocational-leads" sx={{ pl: 4 }}>
                    <ListItemIcon sx={{ color: 'white' }}>
                      <ArrowRightIcon />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary="Vocational Leads" primaryTypographyProps={{ fontWeight: 'bold' }} />}
                  </ListItem>
          
          </>
        )}
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;
