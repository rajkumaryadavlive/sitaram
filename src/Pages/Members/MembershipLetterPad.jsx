import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const MembershipLetterPad = ({ member }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 border border-gray-300 shadow-lg rounded-lg max-w-3xl mx-auto my-4 p-2 sm:p-6">
      {/* Header */}
      <header className="bg-red-800 text-white p-2 sm:p-6 rounded-t-lg shadow-md relative">
        <div className="flex flex-row justify-between items-center mb-2 ">
          <p className="text-xs sm:text-md font-semibold italic text-center">मुलायम सिंह अमर रहे !</p>
          <p className=" text-xs sm:text-md font-semibold italic text-center">डॉ. अम्बेडकर अमर रहें !</p>
          <p className="text-xs sm:text-md font-semibold italic text-center">डॉ. लोहिया अमर रहें !</p>
          <p className="text-xs sm:text-md font-semibold italic text-center">अखिलेश यादव ज़िंदाबाद !</p>

        </div>
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-red-800 via-red-700 to-transparent" />
        <div className="flex flex-row sm:flex-row items-center justify-between border-t border-white sm:pt-4 space-y-2 sm:space-y-0 space-x-2 sm:space-x-4">
          <div className="text-center text-white w-full sm:w-1/3">
            <p className=" text-xs sm:text-lg font-semibold">Adv. Sitaram Yadav</p>
            <p className='text-xs sm:text-base'> District President</p>
            <p className='text-xs sm:text-base'>Samajwadi Party</p>
            <p className='text-xs sm:text-base'>Damoh,Madhya Pradesh</p>

          </div>
          <div className="w-64 sm:w-1/3 flex justify-center">
            <img src={member?.entity.logo} alt="Samajwadi Party Logo" className="h-24 sm:h-32 rounded-full border-4 border-white shadow-xl animate-spin-slow" />
          </div>
          
          <div className="text-center text-white w-full sm:w-1/3 hidden">
            <p className=" text-xs sm:text-lg font-semibold">Dr. Manoj Yadav</p>
            <p className='text-xs sm:text-base'>State President</p>
            <p className='text-xs sm:text-base'>Samajwadi Party,mp</p>
          </div>

          <div className="text-left text-xs sm:text-base text-white  sm:w-1/3">
            <p className="flex items-center mb-1"><FaMapMarkerAlt className="inline-block mr-2" />Pathariya Road, Loko</p>
            <p className="flex items-center mb-1"> Damoh,Madhya Pradesh</p>
            <p className="flex items-center mb-1"><FaPhone className="inline-block mr-2" /> +91 9098650975</p>
            <p className="flex items-center"><FaEnvelope className="inline-block mr-2" /> adv.sry.mp@gmail.com</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-8 bg-white rounded-lg shadow-inner">
        <div className="text-gray-800">
          <p className="text-md font-semibold mb-4 border-b border-gray-200 pb-2">
            <span className="font-bold">Date:</span> {formatDate(member.created_at)}
          </p>

          <p className="text-md font-semibold mb-2">
            <span className="font-bold">To:</span><br />
            <span className="block font-semibold">{member.user.name}</span>
            <span className="block hidden">{member.address.street}</span>
            <span className="block">{member.address.city}, {member.address.state} -  {member.address.zip_code}</span>
          </p>

          <p className="text-md leading-relaxed mb-2">
            Dear {member.user.name},
          </p>
          <p className="text-md leading-relaxed mb-2">
           Welcome to the Samajwadi Party! We are thrilled to have you as a member. Your support and commitment are vital to our mission, and we look forward to your active participation in our initiatives.
          </p>

          <div className='text-center'>
          <p className="text-md leading-relaxed">
            Sincerely,<br />
            <span className="font-bold">Adv. Sitaram Yadav</span><br />
            District President<br />
            Samajwadi Party,Damoh,Madhya Pradesh
          </p>
           </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-red-800 text-white text-center p-4 rounded-b-lg">
        <hr className="border-white mb-4 mx-8" />
        <p className="text-sm font-semibold">
          Samajwadi Party | 19, Vikramaditya Marg, Lucknow, Uttar Pradesh | +91 (555) 123-4567 | info@samajwadiparty.in
        </p>
      </footer>
    </div>
  );
};

export default MembershipLetterPad;
