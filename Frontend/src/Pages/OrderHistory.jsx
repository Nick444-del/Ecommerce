import React, { useState, useEffect } from 'react';
import axiosInstance from '../Components/utils/axiosInstance';

const OrderHistory = () => {
    const [orderData, setOrderData] = useState([]);
    const [filepath, setFilepath] = useState('');

    const getData = async () => {
        const response = await axiosInstance.get('/getorderbytoken');
        setOrderData(response.data.data);
        setFilepath(response.data.filepath);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Order History</h1>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Sr no</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Product Name</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Product Image</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Quantity</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Total Price</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Order Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderData.map((item, index) => (
                            <tr key={index} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-2 text-sm text-gray-800">{index+1}</td>
                                <td className="px-4 py-2 text-sm text-gray-800">{item.productId.title}</td>
                                <td className="px-4 py-2 text-sm">
                                    <img
                                        className="w-16 h-16 object-cover rounded-md"
                                        src={filepath + item.productId.thumbnail}
                                        alt={item.productId.title}
                                    />
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-800">{item.quantity}</td>
                                <td className="px-4 py-2 text-sm text-gray-800">
                                    ₹{item.productId.price * item.quantity}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-800">{item.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderHistory;
