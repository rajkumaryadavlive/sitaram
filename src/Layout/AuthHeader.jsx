import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { getUserInitials } from '../Helpers/TruncateText';

const AuthHeader = () => {  
  const { state } = useAuth();
  const { isAuthenticated, user } = state;

  return (
    <header className="flex justify-between items-center z-50 p-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white fixed left-0 right-0 sm:relative shadow-xl sm:shadow-md">
      <div className="text-2xl font-bold flex items-center">
        <Link to="/">
          {isAuthenticated ? (
            <>
              {/* Logo Image */}
              <img
                src={user?.entityMember?.entity.logo}
                alt="Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain mr-2 rounded-full border border-white shadow-lg"
              />
              {/* Entity Name */}
            </>
          ) : (
            'Instamedic'
          )}
        </Link>
      </div>
      <div className="flex items-center space-x-4 border border-white rounded-full p-2 w-8 h-8 sm:w-10 sm:h-10">
        <Link to="/logout" className="text-blue-200 hover:text-white text-xs sm:text-sm">
          {getUserInitials(user?.name)}
        </Link>
      </div>
    </header>
  );
};

export default AuthHeader;
