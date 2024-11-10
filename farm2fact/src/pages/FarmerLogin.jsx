import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FarmerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3002/farmers/login', { email, password });

      if (response.status === 200) {
        const { token } = response.data;
        const{username}= response.data; // Get the token from the response = 
        localStorage.setItem("token",token);
        localStorage.setItem("username",username) // Store the token in localStorage

        // Redirect to the dashboard after successful login
        navigate('/farmer-dashboard');
      }
    } catch (error) {
      setError('Invalid credentials or error logging in. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center mb-6 text-[#D9A522]">Farmer Login</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-lg font-semibold text-[#A87F35]">Email</label>
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
          <label htmlFor="password" className="block text-lg font-semibold text-[#A87F35]">Password</label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#D9A522] text-white py-2 rounded-lg hover:bg-[#A87F35] transition-all duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default FarmerLogin;
