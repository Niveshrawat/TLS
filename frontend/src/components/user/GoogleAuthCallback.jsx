import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    console.log('Full URL:', window.location.href);
    console.log('URL Parameters:', window.location.search);
    console.log('Token received:', token);

    if (token) {
      localStorage.setItem('token', token);
      navigate('/');
    } else {
      console.error('No token found');
      navigate('/login');
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default GoogleAuthCallback;
