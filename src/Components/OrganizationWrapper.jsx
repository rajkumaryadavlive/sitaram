import React from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';

const OrganizationWrapper = () => {
  const { orgName } = useParams();

  // If orgName is available, proceed with the child routes
  if (orgName) {
    return <Outlet />;
  }

  // If orgName is not available, redirect to a default route (e.g., "/signin")
  return <Navigate to="/signin" replace />;
};

export default OrganizationWrapper;
