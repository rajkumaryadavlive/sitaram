import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Layout from '../../Layout/Layout';
import { useAuth } from '../../Context/AuthContext'; // Adjust the path to where AuthContext is located
import { Navigate, useParams } from 'react-router-dom';
import Logo from '../../Components/ApplicationLogo';
import { get } from '../../Helpers/Axios';

function SignIn() {
  const { orgName } = useParams();
  const { login, state } = useAuth(); // Use the login function and state from AuthContext
  const [formData, setFormData] = useState({
    identifier: '', // Email or phone number
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isEmail, setIsEmail] = useState(true); // Toggle between email and phone
  const[entity,setEntity]=useState(false);

  const getData=async()=>{
      try{
         let response=await get(`/api/entity/${orgName}`);
         let data=response.data.data;
         setEntity(data)
      }catch(e){
        console.log(e);
      }
  }

  useEffect(()=>{
    getData();
  },[])

  const greeting = `Good ${
    new Date().getHours() < 12
      ? 'Morning'
      : new Date().getHours() < 18
      ? 'Afternoon'
      : 'Evening'
  }, Welcome to ${entity.name}`;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));
    if (id === 'identifier') {
      setIsEmail(value.includes('@'));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      if (state.error) {
        throw new Error(state.error);
      }

      // Redirect or handle successful login
      console.log('Login successful');
      // Example: window.location.href = '/dashboard';
    } catch (error) {
      // Handle errors, e.g., display error messages
      console.error('Login failed', error);
      // Set error in local state or handle it directly from context
    }
  };
 console.log({entity})
  return (
      <div className="min-h-screen flex flex-col items-center overflow-none justify-between bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 animate-gradient-shift">
        {/* Header */}
        <header className="mt-8 text-center">
          <div className="flex flex-row justify-center items-center">
            <img src={entity.logo}  className="h-18 w-24 object-contain" />
          </div>
          <h1 className="text-2xl sm:text-5xl font-extrabold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 tracking-tight sm:tracking-wide px-4 sm:px-0 drop-shadow-lg">
           {greeting}
         </h1>
          <p className="text-lg text-gray-600 mt-2 italic hidden">
            "Empowering Your Health Journey with a Personal Touch"
          </p>
        </header>

        {/* Login Form */}
        <div className="flex-grow flex items-center justify-center w-full px-4 sm:px-0">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-700">
              Sign In to Your Account
            </h2>

            {state.error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                {state.error}
              </div>
            )}

            {state.isAuthenticated && <Navigate to="/dashboard" replace={true} />}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="identifier" className="block text-sm font-medium text-indigo-700 text-left">
                  {isEmail ? 'Email or Phone' : 'Phone Number'}
                </label>
                <input
                  type={isEmail ? 'email' : 'tel'}
                  id="identifier"
                  placeholder="Enter your email or phone"
                  className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-full shadow-md placeholder-gray-500 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm transition-all duration-200"
                  value={formData.identifier}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-indigo-700 text-left">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-full shadow-md placeholder-gray-500 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm transition-all duration-200"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-500" /> : <FaEye className="h-5 w-5 text-gray-500" />}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 block text-sm text-gray-700">
                    Keep me signed in
                  </span>
                </label>
                <a href="#" className="text-sm font-medium text-pink-600 hover:text-pink-500">
                  Forgot your password?
                </a>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 border border-transparent rounded-full shadow-lg text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
                >
                  Sign In
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500">OR</span>
              </div>
            </div>

            {/* Social Media Logins */}
            <div className="mt-6 space-y-3 hidden">
              <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition ease-in-out duration-200">
                Sign in with Google
              </button>
              <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition ease-in-out duration-200">
                Sign in with Facebook
              </button>
            </div>

            {/* Registration Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                New to {entity.name}?{' '}
                <a href="#" className="font-medium text-pink-600 hover:text-pink-500">
                  Join our community.
                </a>
              </p>
              <p className="text-sm text-gray-600 mt-1 hidden">
                Looking to partner?{' '}
                <a href="#" className="font-medium text-pink-600 hover:text-pink-500">
                  Register your organization.
                </a>
              </p>
            </div>

            {/* Health Tips */}
            <div className="mt-4 text-center text-gray-700 text-sm hidden">
              <p className="italic">Tip: A smile a day keeps the stress away!</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mb-8 text-center text-sm text-gray-600">
          <p>© 2024 Instamedic. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-gray-800">Terms of Service</a>
            <a href="#" className="hover:text-gray-800">Privacy Policy</a>
            <a href="#" className="hover:text-gray-800">Support</a>
          </div>
        </footer>
      </div>
  );
}

export default SignIn;
