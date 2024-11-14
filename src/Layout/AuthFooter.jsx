import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useAuth } from '../Context/AuthContext';
import { FaHome, FaListAlt, FaUser, FaUsers } from 'react-icons/fa'; // Import icons

const AuthFooter = () => { 
  const { state } = useAuth(); // Get authentication state from context
  const { isAuthenticated ,user} = state; // Extract isAuthenticated from state
    
  return (
    <footer className="bg-gray-800 text-white fixed right-0 bottom-0 left-0 sm:relative ">
      <div className="hidden md:block text-center p-4">
        <p>&copy; 2024 Instamedic. All rights reserved.</p>
      </div>
      <div className="md:hidden flex justify-around p-4">
        <Link to="/dashboard" className="flex flex-col items-center text-white">
          <FaHome className="text-2xl" />
          <span className="text-sm">Home</span>
        </Link>
         {user.entityMember.role=="President"&& <Link to="/members" className="flex flex-col items-center text-white">
          <FaUsers className="text-2xl" />
          <span className="text-sm">Members</span>
        </Link>}
        <Link to="/activities" className="flex flex-col items-center text-white">
          <FaListAlt className="text-2xl" />
          <span className="text-sm">Activity</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center text-white">
          <FaUser className="text-2xl" />
          <span className="text-sm">Profile</span>
        </Link>
      </div>
    </footer>
  );
};

export default AuthFooter;
