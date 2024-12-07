import React, { useEffect, useState } from 'react';
import axiosInstance from '../Components/utils/axiosInstance';

const ProfileDetails = ({ userInfo }) => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAddresses = async () => {
            if (userInfo && userInfo.address && userInfo.address.length > 0) {
                try {
                    // Fetch all addresses simultaneously using Promise.all
                    const responses = await Promise.all(
                        userInfo.address.map(id => axiosInstance.get(`/addresses/${id}`))
                    );

                    // Extract and set all fetched addresses
                    const fetchedAddresses = responses.map(response => response.data.data);
                    // console.log('Fetched Addresses:', fetchedAddresses);
                    setAddresses(fetchedAddresses);
                } catch (error) {
                    console.error("Failed to fetch addresses:", error);
                }
            }
            setLoading(false);
        };

        fetchAddresses();
    }, [userInfo]);

    // Log addresses after they are set
    useEffect(() => {
        // console.log('Updated Addresses:', addresses);
    }, [addresses]);

    if (!userInfo) {
        return <p>Loading user information...</p>;
    }

    const { fullname, email } = userInfo;

    console.log(addresses);

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
                        {addresses.map(({ _id, address, city, state, pincode, mobile }, index) => (
                            <li key={_id} className="p-3 bg-gray-100 rounded">
                                <p><strong>Address {index + 1}:</strong></p>
                                <p><strong>Street:</strong> {address}</p>
                                <p><strong>City:</strong> {city}</p>
                                <p><strong>State:</strong> {state}</p>
                                <p><strong>Pincode:</strong> {pincode}</p>
                                <p><strong>Mobile:</strong> {mobile}</p>
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
