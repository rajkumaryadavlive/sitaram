import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children ,logo}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header logo={logo} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
