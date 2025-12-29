import React from 'react';
import { Navigate } from 'react-router-dom';

const CommonRoute = ({ element: Component }) => {
  const logintype = sessionStorage.getItem('logintype'); 
  const isAuthenticated = logintype === "admin" || logintype === "staff";

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default CommonRoute;
