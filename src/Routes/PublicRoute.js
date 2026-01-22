import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ element: Component }) => {
  const isAuthenticated = localStorage.getItem('logintype');
  const path = isAuthenticated === "admin" ? "/dashboard" : "/dashboard" 
  return isAuthenticated ? <Navigate to={path} /> : <Component />;
};

export default PublicRoute;
