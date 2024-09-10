// 
import React from 'react';
import { Avatar } from '@mui/material';

const AvatarWithInitial = ({ name }) => {
  const getInitials = (name) => {
    const names = name.split(' ');
    return names.map(n => n[0]).join('');
  };

  return (
    <Avatar>
      {getInitials(name)}
    </Avatar>
  );
};

export default AvatarWithInitial;
