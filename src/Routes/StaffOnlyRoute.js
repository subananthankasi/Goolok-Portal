import { Navigate } from 'react-router-dom';

const StaffOnlyRoute = ({ element: Component }) => {
  const isAuthenticated = localStorage.getItem('logintype'); 
  const allow = isAuthenticated === "staff" 
  return allow  ? <Component /> : <Navigate to="/" />;
};

export default StaffOnlyRoute;
