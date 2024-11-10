import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FactoryDashboard = () => {
    const [crops, setCrops] = useState([]);
    const [filteredCrops, setFilteredCrops] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [buyingCropId, setBuyingCropId] = useState(null);
    const [quantityToBuy, setQuantityToBuy] = useState(1);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCrops = async () => {
            try {
                const token = localStorage.getItem('token');
                const useremail = localStorage.getItem('useremail');
                const response = await axios.get('http://localhost:3002/factory-officials/crops', {
                    params: { useremail },
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCrops(response.data);
                setFilteredCrops(response.data);
            } catch (error) {
                console.error('Error fetching crops:', error);
                if (error.response && error.response.status === 401) {
                    handleSignOut();
                }
            }
        };
        fetchCrops();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = crops.filter(crop =>
            crop.name.toLowerCase().includes(term) ||
            (crop.farmer && crop.farmer.location && crop.farmer.location.toLowerCase().includes(term))
        );
        setFilteredCrops(filtered);
    };

    const handleBuy = async (cropId) => {
        if (quantityToBuy <= 0) {
            setError("Quantity must be greater than 0");
            return;
        }

        try {
            const useremail = localStorage.getItem('useremail');
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3002/factory-official/buy-crop', {
                cropId, quantity: quantityToBuy, useremail
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setModalMessage(response.data.message);
            setIsModalOpen(true);
            setBuyingCropId(null);
            setQuantityToBuy(1);

            const updatedCrops = crops.map(crop =>
                crop.id === cropId ? { ...crop, quantity: crop.quantity - quantityToBuy } : crop
            );
            setCrops(updatedCrops);
            setFilteredCrops(updatedCrops);
        } catch (error) {
            console.error(error);
            setModalMessage(error.response?.data?.error || 'Error purchasing crop');
            setIsModalOpen(true);
            if (error.response && error.response.status === 401) {
                handleSignOut();
            }
        }
    };

    const handleViewBoughtCrops = () => {
        navigate('/bought-crops');
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('factoryofficialId');
        navigate('/factory-login');
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="factory-dashboard p-8 bg-gray-100 min-h-screen">
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                        <h3 className="text-xl font-semibold text-gray-800">{modalMessage}</h3>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Dashboard Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-green-700">Factory Official Dashboard</h2>
                <div className="space-x-4">
                    <button
                        onClick={handleViewBoughtCrops}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                    >
                        Bought Crops
                    </button>
                    <button
                        onClick={handleSignOut}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                    >
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search by crop name or location"
                value={searchTerm}
                onChange={handleSearch}
                className="p-3 border border-gray-300 rounded-md w-full mb-6"
            />

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Crops Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse bg-white shadow-lg rounded-md">
                    <thead>
                        <tr className="bg-green-200 text-gray-800">
                            <th className="p-4 border border-gray-200 text-left">Crop Name</th>
                            <th className="p-4 border border-gray-200 text-left">Quantity</th>
                            <th className="p-4 border border-gray-200 text-left">Price</th>
                            <th className="p-4 border border-gray-200 text-left">Harvest Date</th>
                            <th className="p-4 border border-gray-200 text-left">Farmer Name</th>
                            <th className="p-4 border border-gray-200 text-left">Location</th>
                            <th className="p-4 border border-gray-200 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCrops.length > 0 ? (
                            filteredCrops.map((crop) => (
                                <tr key={crop.id} className="hover:bg-gray-50 transition duration-200">
                                    <td className="p-4 border border-gray-200">{crop.name}</td>
                                    <td className="p-4 border border-gray-200">{crop.quantity}</td>
                                    <td className="p-4 border border-gray-200">{crop.price}</td>
                                    <td className="p-4 border border-gray-200">{new Date(crop.harvestDate).toLocaleDateString()}</td>
                                    <td className="p-4 border border-gray-200">{crop.farmer.name}</td>
                                    <td className="p-4 border border-gray-200">{crop.farmer.location}</td>
                                    <td className="p-4 border border-gray-200">
                                        {buyingCropId === crop.id ? (
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={quantityToBuy}
                                                    onChange={(e) => setQuantityToBuy(parseInt(e.target.value))}
                                                    className="p-2 border border-gray-300 rounded-md w-20"
                                                />
                                                <button
                                                    onClick={() => handleBuy(crop.id)}
                                                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-300"
                                                >
                                                    Confirm
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setBuyingCropId(crop.id)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-300"
                                            >
                                                Buy
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="p-4 border border-gray-200 text-center text-gray-500">
                                    No crops found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FactoryDashboard;
