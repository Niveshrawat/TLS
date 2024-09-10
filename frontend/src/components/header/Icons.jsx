import React from 'react';
import Fab from '@mui/material/Fab';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MessageIcon from '@mui/icons-material/Message';
import { styled } from '@mui/system';

const FabContainer = styled('div')(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(5),
  right: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  marginRight:'3rem',

  width:'2rem'
}));

const WhatsAppFab = styled(Fab)(({ theme }) => ({
    backgroundColor: '#25D366', // WhatsApp green color
    '&:hover': {
      backgroundColor: '#20b858',
    },
    color:'white',
    
  }));

const FloatingIcons = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/<your-phone-number>', '_blank');
  };

  const handleMessageClick = () => {
    window.open('sms:<your-phone-number>', '_blank');
  };

  return (
    <FabContainer>
    <WhatsAppFab onClick={handleWhatsAppClick}>
      <WhatsAppIcon />
    </WhatsAppFab>
    <Fab color="secondary" onClick={handleMessageClick}>
      <MessageIcon />
    </Fab>
  </FabContainer>
  );
};

export default FloatingIcons;
