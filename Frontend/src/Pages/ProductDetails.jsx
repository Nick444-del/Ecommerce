import React, { useState, useEffect } from 'react';
import axiosInstance from '../Components/utils/axiosInstance';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const [productData, setProductData] = useState({});
    const [filepath, setFilepath] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { productId } = useParams();

    const getProductDetails = async () => {
        try {
            const response = await axiosInstance.get(`/getproductbyid/${productId}`);
            setProductData(response.data.data);
            setFilepath(response.data.filepath);
        } catch (error) {
            setError(error.message || 'Something went wrong!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductDetails();
    }, [productId]);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="py-10 bg-gray-50">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                    {/* Left Section: Product Image */}
                    <div className="w-full md:w-[45%] bg-white p-5 rounded-lg shadow-lg">
                        <img
                            className="w-full h-auto object-cover rounded-md"
                            src={filepath + productData.thumbnail}
                            alt={productData.title}
                        />
                    </div>

                    {/* Right Section: Product Details */}
                    <div className="w-full md:w-[50%] space-y-6">
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">{productData.title}</h2>
                        <h3 className="text-2xl text-green-600 font-bold">₹ <span className='text-black'>{productData.price}</span></h3>
                        <div className='flex flex-row gap-1'>
                            <button className="w-full md:w-auto px-6 py-3 bg-black text-white rounded-md hover:bg-white hover:text-black border transition-all">
                                Add to Cart
                            </button>
                            <button className="w-full md:w-auto px-6 py-3 bg-white text-black rounded-md hover:bg-black hover:text-white border transition-all">
                                Buy Now
                            </button>
                        </div>

                        <div>
                            <h4 className="text-xl font-bold text-gray-700">Description:</h4>
                            <p className="text-lg text-gray-600 mt-2">{productData.descriptions}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
