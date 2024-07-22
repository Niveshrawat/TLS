import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ roleRequired }) => {
  const { isAuthenticated, role } = useSelector(state => state.admin || {});
  


  if (!isAuthenticated) {
   
    return <Navigate to="/admin/login" />;
   
  }

  if (roleRequired && isAuthenticated && role != roleRequired) {
    
    return <Navigate to="/admin/login" />;
    
  }

  return <Outlet />;
};

const PrivateRoute2 =({ roleRequired }) => {
  const { isAuthenticated, role } = useSelector(state => state.admin || {});
  


  if (isAuthenticated && role== roleRequired) {
   
    return <Navigate to="/admin/dashboard" />;
   
  }

  

  return <Outlet />;
};



export default PrivateRoute;
export { PrivateRoute2 };
