import React from 'react';
import { styled } from '@mui/system';
import { Box, Typography, Grid, useMediaQuery, useTheme, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  School as UniversityIcon,
  Assignment as CertificateIcon,
  Build as ToolsIcon,
  BusinessCenter as BuildingIcon,
  SchoolOutlined as UserGraduateIcon,
  HelpOutline as HandsHelpingIcon,
  MenuBook as ChalkboardTeacherIcon,
  Settings as CogIcon,
} from '@mui/icons-material';

const WaveBackground = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '100vh',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    height: '260vh', // Adjusted height for mobile view
  },
}));

const Wave = styled('div')({
  position: 'absolute',
  bottom: '0',
  width: '100%',
  height: '150px',
});

const ContentContainer = styled('div')({
  position: 'relative',
  zIndex: 1,
  padding: '50px 20px',
  textAlign: 'center',
  color: 'black',
});

const BoxContainer = styled(Grid)(({ theme }) => ({
  marginTop: '50px',
  animation: 'slideIn 1s ease-in-out',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: '4px',
  margin: '10px',
  borderRadius: '10px',
  width: '15rem',
  boxShadow: '0px 0px 10px #F5DAD2',
  height: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: 'white',
  color: 'black',
  transition: 'transform 0.3s ease-in-out', // Added transition
  '&:hover': {
    transform: 'translateY(-10px)', // Move up on hover
  },
  [theme.breakpoints.down('sm')]: {
    width: '15rem',
    margin: '10px 0',
    height: '200px',
    boxSizing: 'border-box', // Ensure equal sizing
  },
}));

const IconWrapper = styled(Box)({
  marginTop: '30px',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  backgroundColor: '#088395',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
});

const WhyJoinUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const items = [
    { icon: <UniversityIcon fontSize="large" />, label: 'University Admission', link: '/undergraduate' },
    { icon: <CertificateIcon fontSize="large" />, label: 'Certification Programs', link: '/all-courses' },
    { icon: <ToolsIcon fontSize="large" />, label: 'Vocational Education', link: '/vocational-education' },
    { icon: <BuildingIcon fontSize="large" />, label: 'Corporate Connect', link: '/corporate-connect' },
    { icon: <UserGraduateIcon fontSize="large" />, label: 'Internships and Industrial Programs', link: '/internship' },
    { icon: <HandsHelpingIcon fontSize="large" />, label: 'Job Support', link: '/job-support' },
    { icon: <ChalkboardTeacherIcon fontSize="large" />, label: 'MDP/FDP', link: '/mdp-fdp' },
    { icon: <CogIcon fontSize="large" />, label: 'Skilling and Enterprise', link: '/skilling-enterprise' },
  ];

  return (
    <WaveBackground>
      <Wave />
      <ContentContainer>
        <Typography variant="h4" gutterBottom fontWeight='bold'>
          Why Join Us?
        </Typography>
        <Typography variant="h6" align="center" paragraph>
          We offer a comprehensive suite of services to help you achieve your educational and career goals.
        </Typography>
        <BoxContainer container spacing={2} justifyContent="center">
          {items.slice(0, 5).map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={2}>
              <Link component={RouterLink} to={item.link} underline="none">
                <StyledBox>
                  <IconWrapper>
                    {item.icon}
                  </IconWrapper>
                  <Typography variant="h6" gutterBottom sx={{ marginTop: '1.2rem' }}>
                    {item.label}
                  </Typography>
                </StyledBox>
              </Link>
            </Grid>
          ))}
        </BoxContainer>
        <BoxContainer container spacing={2} justifyContent="center">
          {items.slice(5).map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={2}>
              <Link component={RouterLink} to={item.link} underline="none">
                <StyledBox>
                  <IconWrapper>
                    {item.icon}
                  </IconWrapper>
                  <Typography variant="h6" gutterBottom sx={{ marginTop: '1.2rem' }}>
                    {item.label}
                  </Typography>
                </StyledBox>
              </Link>
            </Grid>
          ))}
        </BoxContainer>
      </ContentContainer>
    </WaveBackground>
  );
};

export default WhyJoinUs;
