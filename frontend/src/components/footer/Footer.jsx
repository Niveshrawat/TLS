import React from 'react';
import { Container, Grid, Typography, IconButton, Box} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import CallIcon from '@mui/icons-material/Call';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// import Logo from './logo.png';
// Ensure you have a logo.png in your src directory or update the path

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#003285', padding: '30px 0',marginTop:'1rem',color:'white' }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} md={3}>
            <Box mb={2}>
              <img 
                  src="/images/Tls.png"
                  alt="Logo" style={{ maxWidth: '150px' }} />
              
              <Typography variant="body2">Follow us on social media for regular updates, tips, and insights that can help you achieve your career goals! </Typography>
            </Box>
            <Box display="flex" justifyContent="center" marginRight="6rem">
              <IconButton href="https://www.instagram.com/thelearnskills2024/" target="_blank" aria-label="Instagram" sx={{ color: '#E4405F' }}>
                <InstagramIcon />
              </IconButton>
              <IconButton href="https://www.facebook.com/profile.php?id=61566534724653" target="_blank" aria-label="Facebook" sx={{ color: '#1877F2' }}>
                <FacebookIcon />
              </IconButton>
              <IconButton href="https://x.com/TheLearnSkills1" target="_blank" aria-label="Twitter" sx={{ color: 'black' }}>
                < XIcon />
              </IconButton>
              <IconButton href="https://www.twitter.com" target="_blank" aria-label="Twitter" sx={{ color: 'blue' }}>
                < LinkedInIcon />
              </IconButton>
              
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box>
            <Typography variant="h6" gutterBottom sx={{mb:'5px', fontWeight:'bold'}}>
              Company
<Typography component={Link} to="/about" variant="body1" color="white" sx={{ textDecoration: 'none', display: 'block', mb:'3px' }}>
  About Us
</Typography>
            <Typography variant="body1" component={Link} to="/contact" color="white" sx={{ textDecoration: 'none', display: 'block' }}>Contact</Typography>            </Typography>
            

            </Box> 
          </Grid>

          

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{mb:'5px', fontWeight:'bold'}}>
              Legal
            </Typography>
            <Typography component={Link} to="/privacy-policy" variant="body1" color="white" sx={{ textDecoration: 'none', display: 'block', mb:'3px' }}>
  Privacy Policy
</Typography>  
<Typography component={Link} to="/terms-and-conditions" variant="body1" color="white" sx={{ textDecoration: 'none', display: 'block',mb:'3px' }}>
  Terms and Condition
</Typography>           

          </Grid>

          <Grid item xs={12} sm={6} md={3}>
  <Typography variant="h6" gutterBottom>
    Contact Us
  </Typography>
  <Box display="flex" alignItems="center" mb={1}>
    <EmailIcon sx={{ mr: 1, color: '#FFA27F', fontSize:'2rem' }} /> {/* Google Mail red color */}
    <Typography
      variant="body1"
      component="a"
      href="mailto:alliances@thelearnskills.com"
      sx={{ color: 'white', textDecoration: 'none' }} // Keeps the original color and removes hover effect
    >
      alliances@thelearnskills.in
    </Typography>
  </Box>
  <Box display="flex" alignItems="center">
    <CallIcon sx={{ mr: 1, color: 'green', fontSize:'2rem' }} /> {/* Green color for call icon */}
    <Typography
      variant="body1"
      component="a"
      href="tel:9899930067"
      sx={{ color: 'white', textDecoration: 'none' }} // Keeps the original color and removes hover effect
    >
      9899930067
    </Typography>
  </Box>
</Grid>

        </Grid>
        <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop:'2rem',  color:"white" }}>
         Copyright &copy; {new Date().getFullYear()} The Learn Skills(Skyingskills Edutech Pvt. Ltd). All rights reserved.
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '10px', color: "white" }}>
  Created By{' '}
  <a href="https://ovsinnovation.in" target="_blank" rel="noopener noreferrer" style={{ color: "white", textDecoration: 'none' }}>
    OVS Innovation
  </a>
</Typography>

      </Container>
    </footer>
  );
};

export default Footer;
