// components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#D9A522] p-4 shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link 
          to="/" 
          className="text-white font-bold text-2xl hover:text-[#A87F35] transition-all duration-200"
        >
          Farmer to Factory
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link 
            to="/farmer-login" 
            className="text-white font-medium hover:text-[#A87F35] transition-all duration-200"
          >
            Farmer Login
          </Link>
          <Link 
            to="/factory-login" 
            className="text-white font-medium hover:text-[#A87F35] transition-all duration-200"
          >
            Factory Login
          </Link>
          <Link 
            to="/register" 
            className="text-white font-medium hover:text-[#A87F35] transition-all duration-200"
          >
            Register
          </Link>
          <Link 
            to="/aboutus" 
            className="text-white font-medium hover:text-[#A87F35] transition-all duration-200"
          >
       About us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
