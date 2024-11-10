// components/FarmerCrops.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FarmerCrops = () => {
  const [crops, setCrops] = useState([]);  // State to store the list of crops
  const [error, setError] = useState('');  // State to store any error message

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        // Fetch crops from the backend using the stored auth token
        const response = await axios.get('http://localhost:3002/farmers/my-crops', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`  // Attach token in the header
          }
        });
        
        setCrops(response.data);  // Set the crops data in the state
      } catch (err) {
        setError('Error fetching crops');
        console.error(err);
      }
    };

    fetchCrops();
  }, []);  // Run once when the component mounts

  return (
    <div className="bg-[#FAF3E0] min-h-screen p-8">
      <div className="max-w-screen-xl mx-auto">
        {/* Title Section */}
        <div className="bg-[#D9A522] p-6 rounded-lg shadow-lg text-white mb-8">
          <h1 className="text-3xl font-semibold">My Crops</h1>
        </div>

        {/* Error message display */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-8">
            <p>{error}</p>
          </div>
        )}

        {/* Crops List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {crops.length > 0 ? (
            crops.map((crop) => (
              <div
                key={crop.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold text-[#D9A522]">{crop.name}</h3>
                <p className="mt-2 text-lg">Quantity: {crop.quantity}</p>
                <p className="mt-2 text-lg">Price: ₹{crop.price}</p>
                <p className="mt-2 text-lg">Harvest Date: {new Date(crop.harvestDate).toLocaleDateString()}</p>
                <p className="mt-2 text-lg">{crop.description}</p>
              </div>
            ))
          ) : (
            <p className="text-lg text-[#A87F35]">No crops found for this farmer.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerCrops;
