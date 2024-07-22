import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  Grid,
  Avatar,
  Paper,
  Typography,
  Box,
  useMediaQuery,
} from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import TotalUsers from './TotalUsers';
import Chart from './Chart';

const drawerWidth = 240;

const theme = createTheme();

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const RotateAvatar = styled(Avatar)({
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'rotateY(180deg)',
  },
});

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const useCountUp = (endValue, duration) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = endValue / (duration / 30);
    const interval = setInterval(() => {
      start += increment;
      setCount(Math.min(Math.ceil(start), endValue));
      if (start >= endValue) {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [endValue, duration]);

  return count;
};

const AdminDashboard = () => {
  const registeredUsers = useCountUp(17, 1000); // 2000 ms duration
  const totalCourses = useCountUp(9, 2000);
  const totalUniversities = useCountUp(8, 2000);
  const workshopLead = useCountUp(8, 2000);
  const totalUniversitesLead = useCountUp(15, 2000);
  const coursesLead = useCountUp(20, 2000);
  
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = useState(isDesktop);
  const location = useLocation();

  const handleDrawerToggle = () => {
    if (!isDesktop) {
      setOpen(!open);
    }
  };

  useEffect(() => {
    if (!isDesktop) {
      setOpen(false);
    }
  }, [location.pathname, isDesktop]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <Main open={open}>
          <DrawerHeader />
          <Typography variant="h4" noWrap component="div" sx={{ fontWeight: 'bold', marginBottom: '2rem', marginLeft: '2rem' }}>
            Admin Dashboard
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Item
                style={{
                  backgroundColor: '#9681EB',
                  cursor: 'pointer',
                }}
              >
                <RotateAvatar
                  sx={{
                    bgcolor: 'white',
                    color: '#9681EB',
                  }}
                >
                  <PeopleAltOutlinedIcon />
                </RotateAvatar>
                <Typography variant="h6" color="white" fontWeight="bold">
                  {registeredUsers} Registered Users
                </Typography>
              </Item>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Item
                style={{
                  backgroundColor: '#7F27FF',
                  cursor: 'pointer',
                }}
              >
                <RotateAvatar
                  sx={{
                    bgcolor: 'white',
                    color: '#7F27FF',
                  }}
                >
                  <PersonOutlineOutlinedIcon />
                </RotateAvatar>
                <Typography variant="h6" color="white" fontWeight="bold">
                  {totalCourses} Total Courses
                </Typography>
              </Item>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Item
                style={{
                  backgroundColor: '#86B6F6',
                  cursor: 'pointer',
                }}
              >
                <RotateAvatar
                  sx={{
                    bgcolor: 'white',
                    color: '#86B6F6',
                  }}
                >
                  <PersonAddAltOutlinedIcon />
                </RotateAvatar>
                <Typography variant="h6" color="white" fontWeight="bold">
                  {totalUniversities} Total Universities
                </Typography>
              </Item>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Item
                style={{
                  backgroundColor: "#C69774",
                  cursor: 'pointer',
                }}
              >
                <RotateAvatar
                  sx={{
                    bgcolor: 'white',
                    color: '#C69774',
                  }}
                >
                  <PeopleAltOutlinedIcon />
                </RotateAvatar>
                <Typography variant="h6" color="white" fontWeight="bold">
                  {workshopLead} Workshop Leads
                </Typography>
              </Item>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Item
                style={{
                  backgroundColor: '#B5CB99',
                  cursor: 'pointer',
                }}
              >
                <RotateAvatar
                  sx={{
                    bgcolor: 'white',
                    color: '#B5CB99',
                  }}
                >
                  <PersonOutlineOutlinedIcon />
                </RotateAvatar>
                <Typography variant="h6" color="white" fontWeight="bold">
                  {totalUniversitesLead} Total Universities Lead
                </Typography>
              </Item>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Item
                style={{
                  backgroundColor: '#FF9EAA',
                  cursor: 'pointer',
                }}
              >
                <RotateAvatar
                  sx={{
                    bgcolor: 'white',
                    color: '#FF9EAA',
                  }}
                >
                  <PersonAddAltOutlinedIcon />
                </RotateAvatar>
                <Typography variant="h6" color="white" fontWeight="bold">
                  {coursesLead} Courses Lead
                </Typography>
              </Item>
            </Grid>
          </Grid>
        </Main>
      </Box>
      <Box sx={{ marginTop: '2rem', marginLeft: '2rem' }}>
        <Chart />
        <TotalUsers />
      </Box>
    </ThemeProvider>
  );
};

export default AdminDashboard;
