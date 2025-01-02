import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
import NewAddress from '../Components/Modal/NewAddress';
import axiosInstance from '../Components/utils/axiosInstance';
import toast from 'react-hot-toast'

const ProfileDetails = ({ userInfo }) => {
    const [openAddModal, setOpenAddModal] = useState({
        isOpen: false,
        type: 'open',
        data: null
    });
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAddresses = async () => {
        if (userInfo && userInfo.address && userInfo.address.length > 0) {
            try {
                // Fetch all addresses simultaneously using Promise.all
                const responses = await Promise.all(
                    userInfo.address.map(id => axiosInstance.get(`/addresses/${id}`))
                );

                // Extract and set all fetched addresses
                const fetchedAddresses = responses.map(response => response.data.data);
                setAddresses(fetchedAddresses);
            } catch (error) {
                console.error("Failed to fetch addresses:", error);
            }
        }
        setLoading(false);
    };

    const updateUserAddressArray = async (addressId) => {
        try {
            const response = await axiosInstance.delete(`/deleteaddress/${addressId}`)
            if (response.data && response.data.data) {
                console.log("Address deleted: ", response.data);
                setAddresses(prevAddresses => prevAddresses.filter(address => address._id !== addressId));
            }
            fetchAddresses()
        } catch (error) {
            console.log("Error updateing user address array: " + error.message);
        }
    }

    const deleteUserAddress = async (addressId) => {
        try {
            const response = await axiosInstance.delete(`/deleteaddress/${addressId}`);
            if (response.data && response.data.data) {
                console.log("Address deleted: ", response.data);
            }
        } catch (error) {
            console.log("Error deleting address from address collection: " + error.message);
        }
    }

    const handleDeleteAddress = async (addressId) => {
        console.log("Delete Address from Address id: " + addressId)
        updateUserAddressArray(addressId)
        deleteUserAddress(addressId)
    };

    useEffect(() => {
        fetchAddresses();
    }, [userInfo]); // Trigger only when userInfo changes

    useEffect(() => {
        // You can use this useEffect for any additional side effects when addresses are updated
        fetchAddresses();
    }, []);

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
                    <p><strong>Mobile:</strong> {userInfo.mobile || 'N/A'}</p>
                </div>
                <div className='flex justify-start gap-2'>
                    <button
                        className='my-3 w-[120px] h-[45px] bg-black text-white hover:text-black hover:bg-white transition-colors rounded-md'
                        onClick={() => {
                            setOpenAddModal({
                                isShown: true,
                                type: 'add',
                                data: null
                            });
                        }}
                    >
                        New Address
                    </button>
                    <NavLink to="/bookwormdenn/profiledetails/changepassword">
                        <button className='my-3 w-[150px] h-[45px] bg-black text-white hover:text-black hover:bg-white transition-colors rounded-md'>
                            Change Password
                        </button>
                    </NavLink>
                    <NavLink to="/bookwormdenn/profiledetails/orderhistory">
                        <button className='my-3 w-[150px] h-[45px] bg-black text-white hover:text-black hover:bg-white transition-colors rounded-md'>
                            View Order History
                        </button>
                    </NavLink>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-medium text-gray-700">Addresses</h2>
                {loading ? (
                    <p>Loading addresses...</p>
                ) : addresses.length > 0 ? (
                    <ul className="mt-3 space-y-3">
                        {addresses
                            .filter(address => address !== null)  // Filter out null or undefined addresses
                            .map(({ _id, address, city, state, pincode, mobile }, index) => (
                                <li key={_id} className="p-3 bg-gray-100 rounded">
                                    <p><strong>Address {index + 1}:</strong></p>
                                    <p><strong>Address:</strong> {address}</p>
                                    <p><strong>City:</strong> {city}</p>
                                    <p><strong>State:</strong> {state}</p>
                                    <p><strong>Pincode:</strong> {pincode}</p>
                                    <p><strong>Mobile:</strong> {mobile}</p>
                                    <div className="mt-2 flex justify-end gap-4">
                                        <button className='my-3 w-[80px] h-[45px] bg-black text-white hover:text-black hover:bg-white transition-colors rounded-md'>
                                            Edit
                                        </button>
                                        <button
                                            className='my-3 w-[80px] h-[45px] bg-red-600 text-white hover:text-red-600 hover:bg-white transition-colors rounded-md'
                                            onClick={() => handleDeleteAddress(_id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                    </ul>
                ) : (
                    <p className="mt-3 text-gray-600">No addresses available.</p>
                )}
            </div>

            <Modal
                isOpen={openAddModal.isShown}
                onRequestClose={() => { }}
                style={{
                    overlay: {
                        zIndex: 1000,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }
                }}
                contentLabel=''
                className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto"
            >
                <NewAddress
                    type={openAddModal.type}
                    data={openAddModal.data}
                    fetchAddresses={fetchAddresses}
                    onClose={() => {
                        setOpenAddModal({
                            isShown: false,
                            type: 'open',
                            data: null
                        });
                    }}
                />
            </Modal>
        </div>
    );
};

export default ProfileDetails;
