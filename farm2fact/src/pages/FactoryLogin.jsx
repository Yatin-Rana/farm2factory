// src/pages/FactoryLogin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FactoryLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Email and password are required');
            return;
        }

        try {                            
            const response = await axios.post('http://localhost:3002/factory-officials/login', { email, password });
            const { token } = response.data;
            const{username}= response.data;
            // const{factoryofficialId} = response.data
            const{useremail} = response.data
            localStorage.setItem('token', token); // Store token in localStorage
            localStorage.setItem('username', username)
            // localStorage.setItem('factoryofficialId', factoryofficialId)
            localStorage.setItem('useremail',useremail)
            navigate('/factory-dashboard'); // Redirect to home or dashboard after successful login
        } catch (error) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6">
            <h2 className="text-3xl font-semibold text-center mb-6">Factory Official Login</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
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
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default FactoryLogin;
