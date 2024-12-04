import React, { useEffect, useState } from 'react';
import axiosInstance from '../Components/utils/axiosInstance'; // Use your Axios instance

const ProfileDetails = ({ userInfo }) => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userInfo && userInfo.address && userInfo.address.length > 0) {
            const fetchAddresses = async () => {
                try {
                    const addressPromises = userInfo.address.map(id =>
                        axiosInstance.get(`/addresses/${id}`)
                    );
                    const addressResponses = await Promise.all(addressPromises);
                    const addressData = addressResponses.map(response => response.data);
                    setAddresses(addressData);
                } catch (error) {
                    console.error("Failed to fetch addresses", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchAddresses();
        } else {
            setLoading(false);
        }
    }, [userInfo]);

    if (!userInfo) {
        return <p>Loading user information...</p>;
    }

    const { fullname, email } = userInfo;

    return (
        <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-semibold mb-6">Profile Details</h1>

            <div className="mb-5">
                <h2 className="text-xl font-medium text-gray-700">Personal Information</h2>
                <div className="mt-3">
                    <p><strong>Name:</strong> {fullname || 'N/A'}</p>
                    <p><strong>Email:</strong> {email || 'N/A'}</p>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-medium text-gray-700">Addresses</h2>
                {loading ? (
                    <p>Loading addresses...</p>
                ) : addresses.length > 0 ? (
                    <ul className="mt-3 space-y-3">
                        {addresses.map((address, index) => (
                            <li key={index} className="p-3 bg-gray-100 rounded">
                                <p><strong>Address {index + 1}:</strong></p>
                                <p>{address.street}, {address.city}</p>
                                <p>{address.state}, {address.pincode}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="mt-3 text-gray-600">No addresses available.</p>
                )}
            </div>
        </div>
    );
};

export default ProfileDetails;
