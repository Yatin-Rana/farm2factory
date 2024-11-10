import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BoughtCrops = () => {
    const [purchases, setPurchases] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const token = localStorage.getItem('token');
                const useremail = localStorage.getItem('useremail');

                const response = await axios.get(
                    'http://localhost:3002/factory-official/purchases',
                    {
                        params: { email: useremail },
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                setPurchases(response.data);
            } catch (error) {
                console.error('Error fetching purchased crops:', error);
                setError(
                    error.response?.data?.error ||
                    'An error occurred while fetching purchased crops.'
                );
            }
        };

        fetchPurchases();
    }, []);

    return (
        <div className="purchased-crops p-6">
            <h2 className="text-3xl font-bold mb-4">Bought Crops</h2>
            
            {error && <p className="text-red-500">{error}</p>}

            {purchases.length > 0 ? (
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-green-100">
                            <th className="border p-2 text-left">Crop Name</th>
                            <th className="border p-2 text-left">Quantity</th>
                            <th className="border p-2 text-left">Purchase Date</th>
                            <th className="border p-2 text-left">Price</th>
                            <th className="border p-2 text-left">Total Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases.map((purchase, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border p-2">{purchase.cropName}</td>
                                <td className="border p-2">{purchase.quantity}</td>
                                <td className="border p-2">
                                    {new Date(purchase.purchaseDate).toLocaleDateString()}
                                </td>
                                <td className="border p-2">{purchase.price}</td>
                                <td className="border p-2">
                                    {(purchase.price * purchase.quantity).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No crops purchased yet.</p>
            )}
        </div>
    );
};

export default BoughtCrops;
