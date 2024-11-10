import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduce = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const cropData = {
      name,
      quantity,
      price,
      description,
      harvestDate,
    };

    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    if (token) {
      try {
        const response = await axios.post(
          'http://localhost:3002/farmers/crops',
          cropData,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
            },
          }
        );
        
        if (response.status === 201) {
          // Crop added successfully, navigate to dashboard
          navigate('/farmer-dashboard');
        }
      } catch (error) {
        console.error('Error adding crop:', error);
        setError('Error adding crop. Please try again.');
      }
    } else {
      console.log('Token is missing');
      setError('You need to be logged in to add a crop.');
      navigate('/login');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Add New Crop</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Crop Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium">Quantity (in kgs)</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium">Price (per kg)</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="harvestDate" className="block text-sm font-medium">Harvest Date</label>
          <input
            type="date"
            id="harvestDate"
            value={harvestDate}
            onChange={(e) => setHarvestDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Add Crop
        </button>
      </form>
    </div>
  );
};

export default AddProduce;
