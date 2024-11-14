import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Layout from '../../Layout/Layout';
import { useAuth } from '../../Context/AuthContext'; // Adjust the path to where AuthContext is located
import { Navigate } from 'react-router-dom';
import Logo from '../../Components/ApplicationLogo';

function SignUp() {
  const { register, state } = useAuth(); // Use the register function and state from AuthContext
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const greeting = `Join Instamedic - Empowering Your Health Journey`;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    try {
      await register(formData);
      if (state.error) {
        throw new Error(state.error);
      }
      console.log('Registration successful');
      // Example: window.location.href = '/dashboard';
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center overflow-none justify-between bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 animate-gradient-shift">
        {/* Header */}
        <header className="mt-8 text-center">
          <div className="flex flex-row justify-center items-center">
            <Logo className="w-28 h-28 animate-bounce" />
          </div>
          <h1 className="text-3xl font-extrabold mt-4 text-gray-800 tracking-wide">
            {greeting}
          </h1>
          <p className="text-lg text-gray-600 mt-2 italic">
            "Start Your Health Journey with Instamedic"
          </p>
        </header>

        {/* Sign Up Form */}
        <div className="flex-grow flex items-center justify-center w-full px-4 sm:px-0">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-700">
              Create Your Account
            </h2>

            {state.error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                {state.error}
              </div>
            )}

            {state.isAuthenticated && <Navigate to="/dashboard" replace={true} />}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-indigo-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-full shadow-md placeholder-gray-500 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm transition-all duration-200"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-indigo-700">
                  Email/Phone
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-full shadow-md placeholder-gray-500 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm transition-all duration-200"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-indigo-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
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
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-500" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-500" />
                    )}
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-indigo-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-full shadow-md placeholder-gray-500 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm transition-all duration-200"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-500" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-500" />
                    )}
                  </span>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 border border-transparent rounded-full shadow-lg text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
                >
                  Sign Up
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

            {/* Social Media Sign Ups */}
            <div className="mt-6 space-y-3 hidden">
              <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition ease-in-out duration-200">
                Sign up with Google
              </button>
              <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition ease-in-out duration-200">
                Sign up with Facebook
              </button>
            </div>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <a href="#" className="font-medium text-pink-600 hover:text-pink-500">
                  Sign In here.
                </a>
              </p>
            </div>

            {/* Health Tips */}
            <div className="mt-4 text-center text-gray-700 text-sm">
              <p className="italic">Tip: Stay hydrated and healthy!</p>
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
    </Layout>
  );
}

export default SignUp;
