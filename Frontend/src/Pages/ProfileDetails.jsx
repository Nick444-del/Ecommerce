import React, { useEffect, useState } from 'react';
import axiosInstance from '../Components/utils/axiosInstance'

const ProfileDetails = ({ userInfo }) => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState([]);

    useEffect(() => {
        if (userInfo && userInfo.address && userInfo.address.length > 0) {
            setAddresses(userInfo.address);
            for(let i = 0; i < addresses.length; i++){
                console.log(addresses[i])
                const response = axiosInstance.get(`/addresses/${addresses[i]}`);
                console.log(response)
                if (response.data && response.data.data) {
                    setAddress(response.data.data);
                }
                console.log(address)
            }
        }
        setLoading(false);
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
                            <li key={address._id} className="p-3 bg-gray-100 rounded">
                                <p><strong>Address {index + 1}:</strong></p>
                                <p>{address.address}, {address.city}</p>
                                <p>{address.state}, {address.pincode}</p>
                                <p><strong>Mobile:</strong> {address.mobile}</p>
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
