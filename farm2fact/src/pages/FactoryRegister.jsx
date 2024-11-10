// src/pages/FactoryRegister.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FactoryRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !location) {
      setError('All fields are required');
      return;
    }

    try {
      
      const response = await axios.post('http://localhost:3002/factory-official/register', {
        name,
        email,
        password,
        location,
      });

      if (response.status === 201) {
        navigate('/factory-login'); // Redirect to login after successful registration
      }
    } catch (error) {
      setError('Error registering factory official. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Factory Official Registration</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg">Name</label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-lg">Email</label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-lg">Password</label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-lg">Location</label>
          <input
            type="text"
            id="location"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default FactoryRegister;
