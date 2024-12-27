import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ productId, productImage, productTitle, price, filepath }) => {
    const [data, setData] = useState([])
    const navigate = useNavigate();

    const handleAddToCart = async (productId) => {
        try {
            const response = await axiosInstance.post(`/addproducttocart/${productId}`)
            if(response.status === 200){
                setData(response.data.data)
                console.log(data)
            }
            console.log(response.data.data)
            navigate('/bookwormdenn/cart')
        } catch (error) {
            if(error){
                console.log(error)
            }
        }
    }

    // console.log(filepath);
    return (
        <div className="w-[300px] my-2 h-[445px] max-w-sm bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <NavLink to={`/bookwormdenn/productdetails/${productId}`}>
                <img
                    src={filepath + productImage}
                    alt={productTitle}
                    className="w-full h-64 object-cover transition-transform duration-300 transform hover:scale-105"
                />
            </NavLink>
            <div className="p-4">
                <NavLink to={`/bookwormdenn/productdetails/${productId}`}>
                    <h3 className="text-lg font-semibold mb-2">{productTitle}</h3>
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
