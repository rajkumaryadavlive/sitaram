import React from 'react';

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 120 64"
    width="100"
    height="80"
    className="fill-current"
  >
    {/* Modern and creative text within the circle */}
    <text x="42" y="40" fontFamily="'Montserrat', Arial, sans-serif" fontWeight="bold" fontSize="32" fill="#D32F2F">
      Sr
    </text>

    {/* Modern gradient effect on the circle */}
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#1976D2", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#D32F2F", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <circle cx="60" cy="32" r="28" fill="url(#grad1)" opacity="0.3" />

    {/* Minimalistic underline with gradient */}
    <line x1="30" y1="45" x2="110" y2="45" stroke="url(#grad1)" strokeWidth="2" />
  </svg>
);

export default Logo;
