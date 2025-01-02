import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

const ProductCard = ({ productId, productImage, productTitle, price, filepath }) => {
    const [data, setData] = useState([])
    const navigate = useNavigate();

    const handleAddToCart = async (productId) => {
        try {
            const response = await axiosInstance.post(`/addproducttocart/${productId}`)
            if (response.status === 200) {
                setData(response.data.data)
                console.log(data)
            }
            console.log(response.data.data)
            // navigate('/bookwormdenn/cart')
            toast(response.data.message, {
                icon: '🛒'
            })
        } catch (error) {
            if (error) {
                console.log(error)
            }
        }
    }

    // console.log(filepath);
    return (
        <div className="w-[100%] my-2 h-[445px] max-w-sm bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className='w-[290px] h-[290px]'>
                <NavLink to={`/bookwormdenn/productdetails/${productId}`}>
                    <img
                        src={filepath + productImage}
                        alt={productTitle}
                        className="w-[100%] h-[100%] object-cover transition-transform duration-300 transform hover:scale-105"
                    />
                </NavLink>
            </div>
            <div className="p-4">
                <NavLink to={`/bookwormdenn/productdetails/${productId}`}>
                    <h3 className="text-lg font-semibold mb-2 truncate overflow-hidden whitespace-nowrap">{productTitle}</h3>
                </NavLink>
                <p className="text-lg text-gray-600 mt-2">Rs. {price}</p>
                <button className="w-full h-12 mt-4 bg-white text-black font-semibold rounded-md hover:bg-black hover:text-white border-2 border-black hover:border-white transition-colors duration-300" onClick={() => handleAddToCart(productId)}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
