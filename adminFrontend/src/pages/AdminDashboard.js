import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  createTheme,
  Grid,
  Avatar,
  Paper,
  Typography,
  Box,
  useMediaQuery,
} from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import TotalUsers from './TotalUsers';


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
  const [totalCourses, setTotalCourses] = useState(0);
  const [registeredUsers, setRegisteredUsers] = useState(0);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [totalUniversities, setTotalUniversities] = useState(0);
  const [loadingUniversities, setLoadingUniversities] = useState(true);
  const [universityLeads, setUniversityLeads] = useState(0);
const [loadingLeads, setLoadingLeads] = useState(true);
const [coursesLeads, setCoursesLeads] = useState(0);
const [loadingCoursesLeads, setLoadingCoursesLeads] = useState(true);
const [vocationalLeads, setVocationalLeads] = useState(0);
const [loadingVocationalLeads, setLoadingVocationalLeads] = useState(true);





  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = useState(isDesktop);
  const location = useLocation();

  const handleDrawerToggle = () => {
    if (!isDesktop) {
      setOpen(!open);
    }
  };

  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('https://api.thelearnskills.com/api/v1/auth/users', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('API response data:', response.data);

        if (response.data && Array.isArray(response.data.users)) {
          setRegisteredUsers(response.data.users.length);
        } else {
          console.error('Unexpected response data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching registered users:', error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchRegisteredUsers();
  }, []);

  useEffect(() => {
    const fetchUniversities = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('https://api.thelearnskills.com/api/v1/college/colleges', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('API response data:', response.data);

        if (response.data && Array.isArray(response.data)) {
          setTotalUniversities(response.data.length);
        } else {
          console.error('Unexpected response data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching universities:', error);
      } finally {
        setLoadingUniversities(false);
      }
    };

    fetchUniversities();
  }, []);
  useEffect(() => {
    const fetchUniversityLeads = async () => {
      const token = localStorage.getItem('token');
  
      try {
        const response = await axios.get('https://api.thelearnskills.com/api/v1/ug/undergraduates', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('University Leads response data:', response.data);
  
        if (response.data && Array.isArray(response.data)) {
          setUniversityLeads(response.data.length);
        } else {
          console.error('Unexpected response data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching university leads:', error);
      } finally {
        setLoadingLeads(false);
      }
    };
  
    fetchUniversityLeads();
  }, []);
  
  useEffect(() => {
    const fetchCoursesLeads = async () => {
      const token = localStorage.getItem('token');
  
      try {
        const response = await axios.get('https://api.thelearnskills.com/api/v1/sc/short-term-certificates', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('Courses Leads response data:', response.data);
  
        if (response.data && Array.isArray(response.data)) {
          setCoursesLeads(response.data.length);
        } else {
          console.error('Unexpected response data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching courses leads:', error);
      } finally {
        setLoadingCoursesLeads(false);
      }
    };
  
    fetchCoursesLeads();
  }, []);
  useEffect(() => {
    const fetchVocationalLeads = async () => {
      const token = localStorage.getItem('token');
  
      try {
        const response = await axios.get('https://api.thelearnskills.com/api/v1/vcForm/vc-forms', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('Vocational Leads response data:', response.data);
  
        if (response.data && Array.isArray(response.data)) {
          setVocationalLeads(response.data.length);
        } else {
          console.error('Unexpected response data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching vocational leads:', error);
      } finally {
        setLoadingVocationalLeads(false);
      }
    };
  
    fetchVocationalLeads();
  }, []);
  
  

  useEffect(() => {
    const fetchTotalCourses = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('https://api.thelearnskills.com/api/v1/shortTermcourse/short-term-courses', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('Courses response data:', response.data);
        
        if (response.data && Array.isArray(response.data)) {
          setTotalCourses(response.data.length);
        } else {
          console.error('Unexpected response data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching total courses:', error);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchTotalCourses();
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      setOpen(false);
    }
  }, [location.pathname, isDesktop]);

  if (loadingCourses || loadingUsers || loadingUniversities) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <Main open={open}>
          <DrawerHeader />
          <Typography variant="h4" noWrap component="div" sx={{ fontWeight: 'bold', marginBottom: '2rem', marginLeft: {xs:'5rem', sm:'2rem' } }}>
            Admin Dashboard
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Item
                sx={{
                  backgroundColor: '#9681EB',
                  cursor: 'pointer',
                  marginLeft:{xs:"15rem", sm:'0'},
                  width:{xs: '18rem', sm:'auto'},
                  padding: { xs: 2, sm: 4 }, // Smaller padding for xs (mobile) screens
                  '& .MuiTypography-root': {
                    fontSize: { xs: '1rem', sm: '1.25rem' }, // Smaller font size for mobile
                  },
                }}
              >
                <RotateAvatar
                  sx={{
                    bgcolor: 'white',
                    color: '#9681EB',
                    width: { xs: 40, sm: 56 }, // Smaller avatar on mobile
                    height: { xs: 40, sm: 56 }, // Adjust height for mobile
                  }}
                >
                  <PeopleAltOutlinedIcon sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}  />
                </RotateAvatar>
                <Typography variant="h6" color="white" fontWeight="bold">
                  {registeredUsers > 0 ? `${registeredUsers} Registered Users` : 'No Registered Users'}
                </Typography>
              </Item>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Item
                sx={{
                  backgroundColor: '#7F27FF',
                  cursor: 'pointer',
                  marginLeft:{xs:"15rem", sm:'0'},
                  width:{xs: '18rem', sm:'auto'},
                  padding: { xs: 2, sm: 4 }, // Smaller padding for xs (mobile) screens
                  '& .MuiTypography-root': {
                    fontSize: { xs: '1rem', sm: '1.25rem' }, // Smaller font size for mobile
                  },
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
                  {totalCourses > 0 ? `${totalCourses} Total Courses` : 'No Courses Available'}
                </Typography>
              </Item>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Item
                sx={{
                  backgroundColor: '#86B6F6',
                  cursor: 'pointer',
                  marginLeft:{xs:"15rem", sm:'0'},
                  width:{xs: '18rem', sm:'auto'},
                  padding: { xs: 2, sm: 4 }, // Smaller padding for xs (mobile) screens
                  '& .MuiTypography-root': {
                    fontSize: { xs: '1rem', sm: '1.25rem' }, // Smaller font size for mobile
                  },
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
                  {totalUniversities > 0 ? `${totalUniversities} Total Universities` : 'No University Available'}
                </Typography>
              </Item>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={4}>
  <Item
    sx={{
      backgroundColor: '#F9A825',
      cursor: 'pointer',
      marginLeft:{xs:"15rem", sm:'0'},
      width:{xs: '18rem', sm:'auto'},
      padding: { xs: 2, sm: 4 }, // Smaller padding for xs (mobile) screens
      '& .MuiTypography-root': {
        fontSize: { xs: '1rem', sm: '1.25rem' }, // Smaller font size for mobile
      },
    }}
  >
    <RotateAvatar
      sx={{
        bgcolor: 'white',
        color: '#F9A825',
      }}
    >
      <PeopleAltOutlinedIcon />
    </RotateAvatar>
    <Typography variant="h6" color="white" fontWeight="bold">
      {loadingLeads ? 'Loading...' : `${universityLeads} University Leads`}
    </Typography>
  </Item>
</Grid>

<Grid item xs={12} sm={6} md={4} lg={4}>
  <Item
    sx={{
      backgroundColor: '#FF8A80',
      cursor: 'pointer',
      marginLeft:{xs:"15rem", sm:'0'},
      width:{xs: '18rem', sm:'auto'},
      padding: { xs: 2, sm: 4 }, // Smaller padding for xs (mobile) screens
      '& .MuiTypography-root': {
        fontSize: { xs: '1rem', sm: '1.25rem' }, // Smaller font size for mobile
      },
    }}
  >
    <RotateAvatar
      sx={{
        bgcolor: 'white',
        color: '#FF8A80',
      }}
    >
      <PeopleAltOutlinedIcon />
    </RotateAvatar>
    <Typography variant="h6" color="white" fontWeight="bold">
      {loadingCoursesLeads ? 'Loading...' : `${coursesLeads} Courses Leads`}
    </Typography>
  </Item>
</Grid>

<Grid item xs={12} sm={6} md={4} lg={4}>
  <Item
    sx={{
      backgroundColor: '#FF6F61',
      cursor: 'pointer',
      marginLeft:{xs:"15rem", sm:'0'},
      width:{xs: '18rem', sm:'auto'},
      padding: { xs: 2, sm: 4 }, // Smaller padding for xs (mobile) screens
      '& .MuiTypography-root': {
        fontSize: { xs: '1rem', sm: '1.25rem' }, // Smaller font size for mobile
      },
    }}
  >
    <RotateAvatar
      sx={{
        bgcolor: 'white',
        color: '#FF6F61',
      }}
    >
      <PeopleAltOutlinedIcon />
    </RotateAvatar>
    <Typography variant="h6" color="white" fontWeight="bold">
      {loadingVocationalLeads ? 'Loading...' : `${vocationalLeads} Vocational Leads`}
    </Typography>
  </Item>
</Grid>



            
          </Grid>
        </Main>

      </Box>
      <Box sx={{ marginTop: '2rem', marginLeft: '2rem' }}>
        {/* <Chart /> */}
        <TotalUsers />
      </Box>
    </ThemeProvider>
  );
};

export default AdminDashboard;
