import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaShareAlt, FaEye } from 'react-icons/fa';
import axios from 'axios';
import { get } from '../../Helpers/Axios';
import { useAuth } from '../../Context/AuthContext';
import { getUserInitials, truncateText } from '../../Helpers/TruncateText';
import AuthLayout from '../../Layout/AuthLayout';
import MembershipLetterPad from './MembershipLetterPad';

function MemberPage({ member }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const[isExpanded,setIsExpanded]=useState(false);

  const[viewCard,setViewCard]=useState(false);
 
  const { state } = useAuth();
  const { user,token } = state; 

 

  // Fetch member's posts
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        let response= await get(`/api/posts/postable/${member.user_id}`,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
    
        setPosts(response.data);
      } catch (error) {
        setError('Failed to load posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [member.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return ( 
      <>
       {viewCard?<>
      <MembershipLetterPad member={member} /></> :
       <>
       <div className="sm:p-6 mt-12 sm:mt-2">
       {/* Hero Section */}
       <div className="bg-indigo-600 text-white rounded-lg shadow-md p-6 mb-8 flex items-center">
         <div className="bg-white text-indigo-600 rounded-full flex items-center justify-center w-16 h-16 text-2xl font-bold mr-6">
           {getUserInitials(member.user.name)}
         </div>
         <div>
           <h1 className="text-lg sm:text-3xl font-semibold" onClick={()=>setViewCard(true)}>{member.user.name}</h1>
           <p className="text-md sm:text-lg">{member.role}</p> 
         </div>
       </div>
 
       {/* News Feed */}
       <div className="bg-white rounded-lg shadow-md p-6">
         <h2 className="text-xl font-semibold mb-4 text-left">News Feed</h2>
         {posts.length > 0 ? (
           posts.map((post) => (
             <div key={post.id} className="bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
               <p className="text-gray-800 mb-2">{isExpanded?post.content:truncateText(post.content,40)} 
                {isExpanded?<span className='text-blue-900 ml-2'onClick={()=>setIsExpanded(false)}>Read Less</span>
                : <span className='text-blue-900'onClick={()=>setIsExpanded(true)}>Read more</span>}</p>
               <div className="flex justify-between text-gray-600">
                  <div className='flex flex-row space-x-2'>
                  <button className="flex items-center hover:text-gray-800">
                   <FaThumbsUp className="mr-2" /> {post.likes_count}
                 </button>
                 <a href={post.media_url} className="flex items-center hover:text-gray-800">
                   <FaEye className="mr-2" /> 
                 </a>
                  </div>
                 <button className="flex items-center hover:text-gray-800">
                   <FaShareAlt className="mr-2" /> {post.comments_count}
                 </button>
               </div>
             </div>
           ))
         ) : (
           <p className="text-gray-600">No posts available.</p>
         )}
       </div>
     </div></>}</>
  );
}

export default MemberPage;
