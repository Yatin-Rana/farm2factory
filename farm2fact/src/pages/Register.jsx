import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt } from 'react-icons/fa'; // Icons for user, email, password, location

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [userType, setUserType] = useState('farmer'); // Default to 'farmer'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !location) {
      setError('All fields are required');
      return;
    }

    // Determine the registration URL based on the user type
    const registerUrl =
      userType === 'farmer'
        ? 'http://localhost:3002/farmers/register'
        : 'http://localhost:3002/factory-officials/register';

    try {
      const response = await axios.post(registerUrl, {
        name,
        email,
        password,
        location,
      });

      if (response.status === 201) {
        navigate('/'); // Redirect to login after successful registration
      }
    } catch (error) {
      setError('Error registering. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-500">
      <div className="max-w-lg w-full p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">Register</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="flex items-center border-2 border-gray-300 rounded-lg p-2">
            <FaUser className="text-gray-500 mr-3" />
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="flex items-center border-2 border-gray-300 rounded-lg p-2">
            <FaEnvelope className="text-gray-500 mr-3" />
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="flex items-center border-2 border-gray-300 rounded-lg p-2">
            <FaLock className="text-gray-500 mr-3" />
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center border-2 border-gray-300 rounded-lg p-2">
            <FaMapMarkerAlt className="text-gray-500 mr-3" />
            <input
              type="text"
              id="location"
              className="w-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          {/* User Type selection */}
          <div className="flex items-center space-x-4">
            <label className="text-lg">I am a:</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="farmer"
                  checked={userType === 'farmer'}
                  onChange={() => setUserType('farmer')}
                />
                <span>Farmer</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="factory"
                  checked={userType === 'factory'}
                  onChange={() => setUserType('factory')}
                />
                <span>Factory</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Register
          </button>
        </form>

        {/* <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Already have an account?</p>
          <a href="/farmer-login" className="text-blue-600 hover:text-blue-700 text-sm">Login</a>
        </div> */}
      </div>
    </div>
  );
};

export default Register;
