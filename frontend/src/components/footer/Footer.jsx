import React from 'react';
import { Container, Grid, Typography, IconButton, Box} from '@mui/material';
import { Link } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
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
                  src="/images/TLS_LOGO.png"
                  alt="Logo" style={{ maxWidth: '200px' }} />
              
              <Typography variant="body2">Follow us on social media for regular updates, tips, and insights that can help you achieve your career goals! </Typography>
            </Box>
            <Box display="flex" justifyContent="center" marginRight="6rem">
              <IconButton href="https://www.instagram.com" target="_blank" aria-label="Instagram" sx={{ color: '#E4405F' }}>
                <InstagramIcon />
              </IconButton>
              <IconButton href="https://www.facebook.com" target="_blank" aria-label="Facebook" sx={{ color: '#1877F2' }}>
                <FacebookIcon />
              </IconButton>
              <IconButton href="https://www.twitter.com" target="_blank" aria-label="Twitter" sx={{ color: 'black' }}>
                < XIcon />
              </IconButton>
              <IconButton href="https://www.twitter.com" target="_blank" aria-label="Twitter" sx={{ color: 'blue' }}>
                < LinkedInIcon />
              </IconButton>
              
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box>
            <Typography variant="h6" gutterBottom>
              Company
<Typography component={Link} to="/about" variant="body2" color="white" sx={{ textDecoration: 'none', display: 'block' }}>
  About Us
</Typography>
            <Typography variant="body2" component={Link} to="/contact" color="white" sx={{ textDecoration: 'none', display: 'block' }}>Contact</Typography>            </Typography>
            

            <Typography variant="body2" >Press</Typography>
            </Box> 
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Resources
            </Typography>
            <Typography variant="body2">Blog</Typography>
            <Typography variant="body2">Help Center</Typography>
            <Typography variant="body2">Contact Us</Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Typography variant="body2" >Privacy Policy</Typography>
            <Typography variant="body2">Terms of Service</Typography>
            <Typography variant="body2">Cookie Policy</Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop:'2rem',  color:"white" }}>
         Copyright &copy; {new Date().getFullYear()} The Learn Skills. All rights reserved.
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
