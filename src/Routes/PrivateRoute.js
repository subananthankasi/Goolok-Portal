import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component }) => {
  const isAuthenticated = localStorage.getItem('logintype'); 
  const allow = isAuthenticated === "admin" 
  return allow  ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;
