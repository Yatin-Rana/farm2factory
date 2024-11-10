import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate for redirection

const FarmerDashboard = () => {
    const [username, setUsername] = useState('');
  const navigate = useNavigate(); // useNavigate hook for redirection after logout

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        setUsername(storedUsername);
    }
}, []);
  // Handle Sign Out
  const handleSignOut = () => {
    // Clear any stored tokens or session data
    localStorage.removeItem('token'); // Assuming the token is stored in localStorage
    localStorage.removeItem('username'); // Assuming the token is stored in localStorage
    sessionStorage.removeItem('token'); // If it's stored in sessionStorage
    sessionStorage.removeItem('username'); // If it's stored in sessionStorage

    // Redirect to login page
    navigate('/login'); // Redirect to login or home page
  };

  return (
    <div className="bg-[#FAF3E0] min-h-screen p-8">
      <div className="max-w-screen-xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-[#D9A522] p-6 rounded-lg shadow-lg text-white mb-8">
          <h1 className="text-3xl font-semibold">Welcome, {username || 'farmer'}!</h1>
          <p className="mt-2 text-lg">Here's an overview of your farm and activities.</p>
        </div>

        {/* Sign Out Button */}
        <div className="text-right mb-8">
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300"
          >
            Sign Out
          </button>
        </div>

        {/* Dashboard Overview Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Crop Overview */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-semibold text-[#D9A522]">Crop Overview</h3>
            <p className="mt-2 text-lg">Check your current crops and their progress.</p>
            <Link to="/farmer-crops" className="mt-4 inline-block text-[#A87F35] hover:text-[#D9A522] font-medium">
              View Crops
            </Link>
          </div>

          {/* Farm Data */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-semibold text-[#D9A522]">Farm Data</h3>
            <p className="mt-2 text-lg">View detailed farm statistics and reports.</p>
            <Link to="/farm-data" className="mt-4 inline-block text-[#A87F35] hover:text-[#D9A522] font-medium">
              View Data
            </Link>
          </div>

          {/* Add Produce */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-semibold text-[#D9A522]">Add New Produce</h3>
            <p className="mt-2 text-lg">Add new items to your farm's inventory.</p>
            <Link to="/add-produce" className="mt-4 inline-block text-[#A87F35] hover:text-[#D9A522] font-medium">
              Add Produce
            </Link>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h3 className="text-2xl font-semibold text-[#D9A522]">Notifications</h3>
          <p className="mt-2 text-lg">Stay updated with important alerts and notifications.</p>
          <ul className="mt-4 list-disc pl-5">
            <li className="text-lg text-[#A87F35]">Upcoming harvest dates for crops.</li>
            <li className="text-lg text-[#A87F35]">Weather updates for farming conditions.</li>
            <li className="text-lg text-[#A87F35]">Market prices and trends.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
