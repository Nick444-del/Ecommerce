import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axiosInstance from '../Components/utils/axiosInstance';
import NewAddress from '../Components/Modal/NewAddress';
import toast from 'react-hot-toast';
import logi1 from '../assets/images/logi1.png';
import { postPayment } from '../Components/utils/postpayment';
import { paymentMail } from '../Components/utils/paymentmail';
import { useNavigate } from 'react-router-dom';

const BuyNow = () => {
    const [openAddModal, setOpenAddModal] = useState({
        isShown: false,
        type: 'open',
        data: null
    });
    const navigate = useNavigate();
    const [cartData, setCartData] = useState([]);
    const [filePath, setFilePath] = useState("");
    const [address, setAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Cart Data
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/getcartById');
            setCartData(response.data.data);
            setFilePath(response.data.filepath);
        } catch (error) {
            console.error('Error fetching cart data:', error.message);
            setError('Failed to load cart data.');
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch Address Data
    const addressFetch = async () => {
        if (cartData.length === 0 || !cartData[0]?.userId?.address?.length) return;
        try {
            const addressIds = cartData[0].userId.address;
            const responses = await Promise.all(
                addressIds.map(async (id) => {
                    const response = await axiosInstance.get(`/addresses/${id}`);
                    return response.data.data;
                })
            );
            setAddress(responses);
        } catch (error) {
            console.error('Error fetching addresses:', error.message);
            setError('Failed to load address data.');
        }
    };

    // Initial Fetch for Cart Data
    useEffect(() => {
        fetchData();
    }, []);

    // Fetch Address when Cart Data is Ready
    useEffect(() => {
        addressFetch();
    }, [cartData]);

    const handleSelectAddress = (addressId) => {
        setSelectedAddress(addressId);
        toast.success('Address selected!', {
            style: {
                borderRadius: "10px",
                background: "#000",
                color: "#fff"
            },
            iconTheme: {
                primary: '#fff',
                secondary: '#000',
            }
        });
    };

    const handleBuyNow = async () => {
        if (!selectedAddress) {
            toast.error('Please select an address before proceeding.', {
                style: {
                    borderRadius: "10px",
                    background: "#000",
                    color: "#fff"
                },
                iconTheme: {
                    primary: '#fff',
                    secondary: '#000',
                }
            });
            return;
        }

        try {
            const respose = await axiosInstance.post('/checkout')
            console.log(respose.data.order)

            const getUser = await axiosInstance.get('/getuserbytoken')
            console.log(getUser)

            const user = getUser.data.data
            console.log(user)
            console.log(user.mobile)
            const { order } = respose.data
            console.log(order)
            const options = {
                key: "rzp_test_cAtTQ8y0oFdwwk", // Enter the Key ID generated from the Dashboard
                amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: order.currency,
                name: "Bookwormsdenn", //your business name
                description: "Purchase of books",
                image: logi1,
                order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                    name: user.fullname, //your customer's name
                    email: user.email,
                    contact: user.mobile //Provide the customer's phone number for better conversion rates 
                },
                handler: function (response) {
                    console.log(response)
                    postPayment(cartData)
                    const mailData = {
                        paymentData: response,
                        addressData: selectedAddress
                    }
                    console.log(mailData)
                    paymentMail(mailData)
                    toast.success("Payment successfully done", {
                        icon: "👍",
                        style: {
                            borderRadius: "10px",
                            background: "#000",
                            color: "#fff"
                        },
                        iconTheme: {
                            primary: '#fff',
                            secondary: '#000',
                        }
                    })
                    fetchData()
                    navigate("/bookwormdenn")
                },
                notes: {
                    address: "Dahisar, Mumbai-68, Maharashtra"
                },
                theme: {
                    color: "#000000"
                }
            };
            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.log(error.message)
        }

        console.log('Proceeding to Checkout...');
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl font-medium animate-pulse">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-red-500 font-medium">{error}</p>
            </div>
        );
    }

    if (cartData.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl font-medium">Your cart is empty.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            {/* User Info */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-bold mb-4">User Information</h2>
                <p><strong>Name:</strong> {cartData[0]?.userId?.fullname}</p>
                <p><strong>Email:</strong> {cartData[0]?.userId?.email}</p>
                <p><strong>Phone:</strong> {cartData[0]?.userId?.mobile}</p>
            </div>

            {/* Address Selection */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Select Address</h2>
                    <button
                        onClick={() => setOpenAddModal({ isShown: true, type: 'add', data: null })}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        + Add Address
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {address.length > 0 ? (
                        address.map((addr) => (
                            <button
                                key={addr._id}
                                onClick={() => handleSelectAddress(addr._id)}
                                className={`p-4 border rounded-md text-left shadow-md ${selectedAddress === addr._id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                                    }`}
                            >
                                <p><strong>{addr.fullname}</strong></p>
                                <p>{addr.address}, {addr.city}, {addr.state} - {addr.pincode}</p>
                                <p><strong>Mobile:</strong> {addr.mobile}</p>
                            </button>
                        ))
                    ) : (
                        <p>No addresses available. Please add one.</p>
                    )}
                </div>
            </div>

            {/* Cart Items */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-bold mb-4">Cart Items</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {cartData.map((product, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-lg overflow-hidden"
                        >
                            <img
                                src={`${filePath}/${product.productId.thumbnail}`}
                                alt={product.productId.title}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{product.productId.title}</h3>
                                <p>Quantity: {product.quantity}</p>
                                <p>Price: ₹{product.productId.price * product.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Buy Now Button */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={handleBuyNow}
                    className="bg-green-500 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-green-600"
                >
                    Buy Now
                </button>
            </div>

            {/* Modal for Adding Address */}
            <Modal
                isOpen={openAddModal.isShown}
                onRequestClose={() => setOpenAddModal({ isShown: false })}
                style={{
                    overlay: { zIndex: 1000, backgroundColor: 'rgba(0, 0, 0, 0.5)' }
                }}
                className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto"
            >
                <NewAddress
                    type={openAddModal.type}
                    data={openAddModal.data}
                    addressFetch={addressFetch} // Pass the addressFetch function as a prop to trigger address update
                    onClose={() => setOpenAddModal({ isShown: false })}
                />
            </Modal>
        </div>
    );
};

export default BuyNow;
