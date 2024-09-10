// GoogleAuth.js
import React from 'react';

const GoogleAuth = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'https://api.thelearnskills.com/api/v1/auth/google';  // Point to backend Google auth route
  };

  return (
    <button
      onClick={handleGoogleLogin}
      style={{
        marginTop: '1rem',
        backgroundColor: '#4285F4',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '100%',
      }}
    >
      Login with Google
    </button>
  );
};

export default GoogleAuth;
