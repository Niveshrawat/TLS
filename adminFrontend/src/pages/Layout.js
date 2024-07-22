import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = ({ children, open, handleDrawerToggle }) => {
  const location = useLocation();

  return (
    <div style={{ display: 'flex' }}>
      {location.pathname !== '/admin/login' && <Sidebar open={open} handleDrawerToggle={handleDrawerToggle} />}
      <main style={{ flexGrow: 1, padding: '16px' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
