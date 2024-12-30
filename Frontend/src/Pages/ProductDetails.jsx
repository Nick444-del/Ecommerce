import React, { useState, useEffect } from 'react';
import axiosInstance from '../Components/utils/axiosInstance';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal'
import AddReview from '../Components/Modal/AddReview';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import toast from 'react-hot-toast'

const ProductDetails = () => {
    const [productData, setProductData] = useState({});
    const [data, setData] = useState([]);
    const [filepath, setFilepath] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { productId } = useParams();
    console.log(productId)
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState({
        isShown: false,
        type: 'add',
        data: null,
        productId: null
    })

    const getProductDetails = async () => {
        try {
            const response = await axiosInstance.get(`/getproductbyid/${productId}`);
            setProductData(response.data.data);
            setFilepath(response.data.filepath);
            setLoading(false);
        } catch (error) {
            setError(error.message || 'Something went wrong!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (productId) => {
        try {
            const response = await axiosInstance.post(`/addproducttocart/${productId}`)
            if (response.status === 200) {
                setData(response.data.data)
                console.log(data)
            }
            console.log(response.data.data)
            // navigate('/bookwormdenn/cart')
            toast('Added to Cart', {
                icon: '🛒'
            })
        } catch (error) {
            if (error) {
                console.log(error)
            }
        }
    }

    const getProductReview = async () => {
        try {
            const response = await axiosInstance.get(`/productreview/${productId}`)
            console.log(response.data.data)
        } catch (error) {

        }
    }

    const handleAddToFavourites = async () => {
        try {
            const response = await axiosInstance.post(`/addfavorite/${productId}`)
            if(response.status === 200){
                alert("Added to favorites")
                console.log(response.data.data)
            }
        } catch (error) {
            if(error){
                console.log(error)
            }
        }
    }

    const removeFromFavourites = async () => {
        try {
            
        } catch (error) {
            
        }
    }

    const checkProductInFavourites = async (productId) => {
        console.log("Remove from Product ", productId)
    }
    const givewReview = async () => {
        console.log(productId)
        setOpenModal({
            isShown: true,
            type: 'add',
            data: null,
            productId: productId
        })
    }

    useEffect(() => {
        checkProductInFavourites(productId)
        getProductDetails();
        getProductReview();
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
                        <div className='flex flex-row justify-between gap-1'>
                            <div className='flex flex-row gap-1'>
                                <button onClick={() => handleAddToCart(productData._id)} className="w-full md:w-auto px-6 py-3 bg-black text-white rounded-md hover:bg-white hover:text-black border transition-all">
                                    Add to Cart
                                </button>
                                <button className="w-full md:w-auto px-6 py-3 bg-white text-black rounded-md hover:bg-black hover:text-white border transition-all">
                                    Buy Now
                                </button>
                            </div>
                            <button onClick={() => handleAddToFavourites(productData._id)} className='w-full md:w-auto px-6 py-3 bg-white text-black rounded-md hover:bg-black hover:text-white border transition-all'>
                                <FavoriteBorderIcon className='text-red-500' />
                            </button>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-700">Description:</h4>
                            <p className="text-lg text-gray-600 mt-2">{productData.descriptions}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mt-10">Review & Rating</h2>
                    <div>
                        <button onClick={() => givewReview(productData._id)} className='w-full md:w-auto px-6 py-3 bg-black text-white rounded-md hover:bg-white hover:text-black border transition-all'>Give Review</button>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={openModal.isShown}
                onRequestClose={() => { }}
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                }}
                contentLabel=''
                className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto'
            >
                <AddReview
                    type={openModal.type}
                    productId={openModal.productId}
                    onClose={() => setOpenModal({ isShown: false, type: 'add', data: null, productId: null })}
                />
            </Modal>
        </div>
    );
};

export default ProductDetails;
