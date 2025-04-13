import React, { useState, useEffect } from 'react';
import axiosInstance from '../Components/utils/axiosInstance';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
    const [cartData, setCartData] = useState([]);
    const [filePath, setFilePath] = useState("");

    const getAllData = async () => {
        try {
            const response = await axiosInstance.get('/getcartById');
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
        if(resposne.data && resposne.data.data){
            setCartData(resposne.data.data)
        }
        getAllData()
    }

    useEffect(() => {
        getAllData();
    }, []);

    return (
        <div>
            <h1 className='text-[40px] font-bold text-center my-6'>Shopping Cart</h1>
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
                                    <span className='text-lg font-semibold'>₹{item.productId.price}</span>
                                    <div className='ml-6'>
                                        <button className='bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600'>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center mt-1'>
                                    <div className='mt-2 flex items-center'>
                                        <span className='text-lg'>Quantity: {item.quantity}  <AddIcon className='text-lg cursor-pointer' onClick={() => IncreaseQuantity(item._id)} /><RemoveIcon className='text-lg cursor-pointer' onClick={() => DecreaseQuantity(item._id)} /></span>
                                    </div>
                                    <button onClick={() => removeFromCart(item._id)} className='bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none transition-all ease-in-out duration-300'
                                        aria-label="Delete Item"
                                        title="Delete">
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Cart;
