import React, { useEffect, useState } from 'react';
import { FaChartLine, FaUsers, FaTasks, FaCalendarDay, FaCog } from 'react-icons/fa';
import AuthLayout from '../../Layout/AuthLayout';
import { Link } from 'react-router-dom';
import { get } from '../../Helpers/Axios';
import { useAuth } from '../../Context/AuthContext';
import { truncateText } from '../../Helpers/TruncateText';

const Dashboard = () => {  
  const { state } = useAuth();
  const { user, token } = state;
  const [data, setData] = useState([]);  
  const [isExpanded, setIsExpanded] = useState(false);

  const getData = async () => {
    let response = await get(`/api/posts/postable/${user.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      setData(response.data);
      console.log({ response });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AuthLayout userType={'President'}>
      <div className="max-w-7xl mx-auto p-6 mt-12 sm:mt-2 bg-gray-100 min-h-screen z-0">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-gray-800 transition-transform transform hover:scale-105">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-all transform hover:rotate-12">
              <FaCog />
            </button>
          </div>
        </header>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-xl transform hover:-translate-y-1 transition-all">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full animate-pulse">
              <FaChartLine className="text-3xl animate-bounce" />
            </div>
            <div>
              <p className="text-md sm:text-2xl font-semibold text-gray-800">Performance</p>
              <p className="text-gray-600 text-xs">Monitor progress and trends</p>
            </div>
          </div>
          {user.entityMember.role=="President"&& <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-xl transform hover:-translate-y-1 transition-all">
            <div className="bg-green-100 text-green-600 p-3 rounded-full animate-pulse">
              <FaUsers className="text-3xl animate-bounce" />
            </div>
             <div>
              <Link to='/members'>
                <p className="text-md sm:text-2xl font-semibold text-gray-800">Members</p>
                <p className="text-gray-600 text-xs">Manage team members</p>
              </Link>
            </div>
          </div>}
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-xl transform hover:-translate-y-1 transition-all">
            <div className="bg-orange-100 text-orange-600 p-3 rounded-full animate-pulse">
              <FaTasks className="text-3xl animate-bounce" />
            </div>
            <div>
              <Link to="/activities">
                <p className="text-md sm:text-2xl font-semibold text-gray-800">Tasks</p>
                <p className="text-gray-600 text-xs">Track tasks and deadlines</p>
              </Link>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-xl transform hover:-translate-y-1 transition-all">
            <div className="bg-purple-100 text-purple-600 p-3 rounded-full animate-pulse">
              <FaCalendarDay className="text-3xl animate-bounce" />
            </div>
            <div>
              <p className="text-md sm:text-2xl font-semibold text-gray-800">Calendar</p>
              <p className="text-gray-600 text-xs">View and manage events</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-2 sm:p-6 rounded-lg shadow-md mb-8 hover:shadow-xl transform hover:scale-103 transition-all">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-left">Recent Activity</h2>
        <ul className="space-y-4">
          {data?.map((item, index) => (
            <li key={index} className="flex items-start justify-between flex-col sm:flex-row">
              <div className="flex items-start sm:space-x-4">
                {/* Icon visible on desktop/tablet, hidden on mobile */}
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full animate-pulse hidden sm:flex">
                  <FaChartLine className="text-xl animate-bounce" />
                </div>
                <p className="text-gray-800 leading-relaxed">
                  {isExpanded ? item.content : truncateText(item.content, 20)}
                  {isExpanded ? (
                    <span className='text-blue-900 ml-2 cursor-pointer' onClick={() => setIsExpanded(false)}>Read Less</span>
                  ) : (
                    <span className='text-blue-900 cursor-pointer' onClick={() => setIsExpanded(true)}>Read More</span>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      </div>
    </AuthLayout>
  );
};

export default Dashboard;
