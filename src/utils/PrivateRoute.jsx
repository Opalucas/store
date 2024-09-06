import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import authService from '../services/authService';


const PrivateRoute = () => {
  // const token = localStorage.getItem('token');

  // if (!token || !authService.isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PrivateRoute;
