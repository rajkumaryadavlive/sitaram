import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

// The ProtectedRoute component handles redirecting based on authentication
const ProtectedRoute = ({ element, ...rest }) => {
  const { state } = useAuth(); // Get authentication state from context
  const { isAuthenticated } = state; // Extract isAuthenticated from state

  return isAuthenticated ? element : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
