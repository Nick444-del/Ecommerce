import React, { useState, useEffect } from 'react'
import axiosInstance from '../Components/utils/axiosInstance'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast'
import logi1 from '../assets/images/logi1.png'
import { postPayment } from '../Components/utils/postpayment';
import { paymentMail } from '../Components/utils/paymentmail';


const Cart = () => {
    const [cartData, setCartData] = useState([]);
    const [filePath, setFilePath] = useState("");

    const getAllData = async () => {
        try {
            const response = await axiosInstance.get('/getcartById')
            console.log(response.data.data)
            setCartData(response.data.data);  // Update to match structure in response
            console.log(response.data.filepath)
            setFilePath(response.data.filepath)
        } catch (error) {
            console.log(error);
        }
    };

    const IncreaseQuantity = async (cartId) => {
        const response = await axiosInstance.put(`/increasecart/${cartId}`)
        console.log("Updated cart data: " + response.data.data)
        if (response.data && response.data.data) {
            setCartData(response.data.data)
        }
        getAllData()
    }

    const DecreaseQuantity = async (cartId) => {
        const response = await axiosInstance.put(`/decreasecart/${cartId}`)
        console.log("Updated cart data: " + response.data.data)
        if (response.data && response.data.data) {
            setCartData(response.data.data)
        }
        getAllData()
    }

    const removeFromCart = async (cartId) => {
        const resposne = await axiosInstance.delete(`/removefromcart/${cartId}`)
        console.log("Removed data from cart: " + resposne.data.data)
        if (resposne.data && resposne.data.data) {
            setCartData(resposne.data.data)
            toast.success(resposne.data.message)
        }
        getAllData()
    }

    const handleCheckout = async () => {
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
                handler:function (response){
                    console.log(response)
                    postPayment(cartData)
                    paymentMail(response)
                    toast.success("Payment successfully done", {
                        icon: "👍"
                    })
                    getAllData()
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
            console.log(error)
        }
    }

    const getAddress = async () => {
        const response = await axiosInstance.get('/getalladdress')
        console.log(response.data.data)
    }

    const calculateTotal = () => {
        return cartData.reduce((total, item) => total + item.productId.price * item.quantity, 0).toFixed(2);
    };

    useEffect(() => {
        getAddress()
        getAllData()
    }, [])


    return (
        <div>
            <h1 className='text-[40px] font-bold text-center my-6'>Shopping Cart</h1>
            <div className='flex justify-between items-center gap-1'>
                <div className='mx-[50px] md:mx-[100px]'>
                    {cartData.length === 0 ? (
                        <p className='text-center text-xl my-[117px]'>Your cart is empty!</p>
                    ) : (
                        cartData.map((item) => (
                            <div key={item._id} className='flex flex-col md:flex-row items-center bg-gray-100 rounded-lg p-4 mb-6'>
                                <div className='w-48 h-64 bg-cover bg-center rounded-lg'>
                                    <img src={`${filePath}/${item.productId.thumbnail}`} alt={item.productId.title} className='w-full h-full object-cover rounded-lg' />
                                </div>
                                <div className='ml-0 md:ml-6 mt-4 md:mt-0'>
                                    <h2 className='text-xl font-semibold'>{item.productId.title}</h2>
                                    <p className='text-gray-500'>{item.productId.author}</p>
                                    <p className='text-gray-700'>{item.productId.descriptions.slice(0, 150)}...</p>
                                    <div className='mt-4 flex items-center'>
                                        <span className='text-lg font-semibold text-green-600'>₹{item.productId.price}</span>
                                    </div>
                                    <div className='flex justify-between items-center mt-1'>
                                        <div className='mt-2 flex items-center'>
                                            <span className='text-lg'>Quantity: {item.quantity}  <span className='flex items-center justify-center'>
                                                <button
                                                    className='text-lg cursor-pointer px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition'
                                                    onClick={() => IncreaseQuantity(item._id)}
                                                    aria-label="Increase Quantity"
                                                >
                                                    <AddIcon />
                                                </button>

                                                <button
                                                    className='text-lg cursor-pointer px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition'
                                                    onClick={() => DecreaseQuantity(item._id)}
                                                    aria-label="Decrease Quantity"
                                                >
                                                    <RemoveIcon />
                                                </button>
                                            </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='ml-6 flex items-start justify-start'>
                                    <button onClick={() => removeFromCart(item._id)} className='bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600'>
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 sticky top-4">
                    <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                    <div className="flex justify-between mb-2">
                        <span>Subtotal:</span>
                        <span>₹{calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Shipping:</span>
                        <span>₹50</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span>₹{(parseFloat(calculateTotal()) + 50).toFixed(2)}</span>
                    </div>
                    <button id='rzp-button1' className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600" onClick={handleCheckout}>
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart