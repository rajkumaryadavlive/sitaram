import React, { useEffect, useState } from 'react';
import { FaUserEdit, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit } from 'react-icons/fa';
import AuthLayout from '../../Layout/AuthLayout';
import { getUserInitials } from '../../Helpers/TruncateText';
import { useAuth } from '../../Context/AuthContext';
import { get } from '../../Helpers/Axios';

const Profile = () => {
  const { state } = useAuth();
  const { user ,token} = state;
 const[data,setData]=useState([]);

  const getData=async()=>{   
      let response= await get(`/api/posts/postable/${user.id}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      

      if(response.status==200){
        setData(response.data);
        console.log({response})
      }
  }
  
  useEffect(()=>{
       getData();
  },[])
  //console.log({data})
  return (
    <AuthLayout userType={'user'}>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 h-64 sm:h-80 flex items-center justify-center text-white my-12 sm:my-2">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 opacity-90"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center sm:justify-start sm:space-x-8 w-full px-6 sm:px-12 ">
          {/* Profile Picture */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white bg-white flex items-center justify-center text-blue-600 text-4xl font-bold shadow-lg">
            {getUserInitials(user?.name)}
          </div>
          {/* Profile Info */}
          <div className="mt-4 sm:mt-0 text-center sm:text-left">
            <h1 className="text-2xl sm:text-4xl font-semibold">{user?.name}</h1>
            <p className="mt-2 text-md sm:text-lg">
              {user?.entityMember.role} at {user?.entityMember?.entity.name}, {user?.entityMember?.address.state}
            </p>
          </div>
          {/* Edit Button */}
          <button className="absolute top-4 right-4 bg-white text-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-50 transition-all">
            <FaEdit className="text-lg" />
          </button>
        </div>
      </div>

      {/* Profile Details Section */}
      <div className="max-w-7xl mx-2 bg-white shadow-sm  overflow-hidden mt-6 transform transition-transform hover:scale-102 duration-300">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-left mb-3 sm:mb-4 text-gray-700">
            <FaPhone className="mr-2 sm:mr-3 text-blue-600" />
            <span className="text-base sm:text-lg">{user?.phone}</span>
          </div>
          <div className="flex items-center justify-center mb-3 sm:mb-4 text-gray-700 hidden">
            <FaEnvelope className="mr-2 sm:mr-3 text-blue-600" />
            <span className="text-base sm:text-lg">{user?.email}</span>
          </div>
          <div className="flex items-center justify-left text-gray-700">
            <FaMapMarkerAlt className="mr-2 sm:mr-3 text-blue-600" />
            <span className="text-base sm:text-lg">
              {user?.entityMember?.address.city}, {user?.entityMember?.address.state}
            </span>
          </div>
        </div>
        <div className="p-6 sm:p-8 border-t border-gray-200 bg-gray-50 flex flex-col items-center">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-sm text-gray-500 mb-4">Profile 75% complete</p>
          <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 transition-all shadow-md">
            Edit Profile
          </button>
        </div>
      </div>

      {/* News Feed Section */}
      <div className="max-w-7xl mx-2 mt-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-left">News Feed</h2>
        <div className="space-y-4">
          {/* Sample News Feed Items */}
           {data?.map((item,index)=>{
               return(<>
              <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 text-left">{item?.title}</h3>
            <p className="text-gray-600 mt-2 text-left">
             {item.content}</p>
          </div></>)
           })}
         
          {/* Add more news items here */}
        </div>
      </div>
    </AuthLayout>
  );
};

export default Profile;
