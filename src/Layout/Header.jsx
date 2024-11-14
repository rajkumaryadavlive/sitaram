import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa'; // Importing user icon from React Icons
import Logo from '../Components/ApplicationLogo';
import { Link } from 'react-router-dom';

function Header({logo}) {
  const [isOpen, setIsOpen] = useState(false); // State to manage menu visibility

  // Function to toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="text-white p-4 flex justify-between items-center bg-opacity-80">
       {logo? <img
              src={logo}
              alt="Logo"
              className="h-12 w-12 object-contain" // Adjusted height for a balanced logo size
            />: <Logo />
         }
        {/* Menu Button */}
        <div className="flex">
          <button
            onClick={toggleMenu}
            className="text-indigo-900 hover:text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                className="hidden md:block"
                fillRule="evenodd"
                d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"
              />
              <path
                className="block md:hidden"
                fillRule="evenodd"
                d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"
              />
            </svg>
          </button>
        </div>

       

        {/* Menu Overlay (for both mobile and desktop) */}
        <div
          className={`${
            isOpen ? 'fixed inset-0 bg-gray-800 bg-opacity-75' : 'hidden'
          } `}
          onClick={toggleMenu}
        >
          {/* Mobile Menu Content */}
          <div className="flex flex-col items-center justify-center h-full">
            <ul className="space-y-4 text-center">
              <li>
                <a
                  href="#hero"
                  className="text-2xl py-2 text-white hover:text-gray-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-2xl py-2 text-white hover:text-gray-300"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-2xl py-2 text-white hover:text-gray-300"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-2xl py-2 text-white hover:text-gray-300"
                >
                  Contact
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <Link to="/sp/signin" className="text-xl font-medium text-white hover:text-gray-300">
                Signin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
