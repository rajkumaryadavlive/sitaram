// AuthSidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaDashboard, FaUsers, FaChartBar, FaCog, FaUser, FaTachometerAlt, FaCalendarAlt } from 'react-icons/fa';
import { useAuth } from '../Context/AuthContext';

const AuthSidebar = ({ userType }) => {
 
  return (
    <aside className="w-64 bg-gray-200 p-4 shadow-lg md:flex flex-col space-y-4 hidden">
      <nav className="flex-1">
        <ul className="space-y-2">
          {userType === 'President' && (
            <>
              <li>
                <Link to="/dashboard" className="flex items-center text-blue-700 hover:bg-blue-100 p-2 rounded-md transition-colors">
                  <FaTachometerAlt className="mr-3 text-xl" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/members" className="flex items-center text-blue-700 hover:bg-blue-100 p-2 rounded-md transition-colors">
                  <FaUsers className="mr-3 text-xl" />
                   Members
                </Link>
              </li>
              <li>
                <Link to="/reports" className="flex items-center text-blue-700 hover:bg-blue-100 p-2 rounded-md transition-colors">
                  <FaChartBar className="mr-3 text-xl" />
                  Reports
                </Link>
              </li>
              <li>
                <Link to="/settings" className="flex items-center text-blue-700 hover:bg-blue-100 p-2 rounded-md transition-colors">
                  <FaCog className="mr-3 text-xl" />
                  Settings
                </Link>
              </li>
            </>
          )}
          {userType === 'Member' && (
            <>
              <li>
                <Link to="/profile" className="flex items-center text-blue-700 hover:bg-blue-100 p-2 rounded-md transition-colors">
                  <FaUser className="mr-3 text-xl" />
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/activities" className="flex items-center text-blue-700 hover:bg-blue-100 p-2 rounded-md transition-colors">
                  <FaCalendarAlt className="mr-3 text-xl" />
                  My Activities
                </Link>
              </li>
              <li>
                <Link to="/settings" className="flex items-center text-blue-700 hover:bg-blue-100 p-2 rounded-md transition-colors">
                  <FaCog className="mr-3 text-xl" />
                  Settings
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default AuthSidebar;
