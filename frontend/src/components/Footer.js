import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
   
      {/* Copyright */}
      <div className="text-center text-gray-500">
        &copy; {new Date().getFullYear()} dmy_system. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
