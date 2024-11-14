import React from 'react';
import AuthHeader from './AuthHeader';
import AuthFooter from './AuthFooter';
import AuthSidebar from './AuthSidebar';
import { useAuth } from '../Context/AuthContext';

const AuthLayout = ({ children, userType, userName }) => {
  const { state } = useAuth(); 
  const { isAuthenticated, user } = state; 
  return (
    <div className="flex flex-col min-h-screen">
      <AuthHeader userName={userName} />
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar will be hidden on mobile devices */}
        <AuthSidebar className="hidden md:block w-full md:w-64" userType={user.entityMember.role} />
        <main className="flex-1 p-0 bg-gray-50">
          {children}
        </main>
      </div>
      <AuthFooter />
    </div>
  );
};

export default AuthLayout;
