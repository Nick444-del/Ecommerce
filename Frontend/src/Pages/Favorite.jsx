import React, { useState, useEffect } from 'react';
import axiosInstance from '../Components/utils/axiosInstance';
import ProductCard from '../Components/ProductCard/ProductCard';

const Favorite = () => {
    const [favData, setFavData] = useState([]); // Stores favorite product IDs
    const [productData, setProductData] = useState([]); // Stores product details
    const [filepath, setFilePath] = useState('');
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(''); // Error state

    // Fetch favorite products
    const getFavorites = async () => {
        try {
            setLoading(true); // Start loading
            const response = await axiosInstance.get('/getuserfav');
            const favoriteItems = response.data.data;
            const filepath = response.data.filepath || 'http://localhost:5000/uploads';
            setFilePath(filepath);

            const productPromises = favoriteItems.map((fav) =>
                axiosInstance.get(`/getproductbyid/${fav.product}`)
            );

            const products = await Promise.all(productPromises);
            setProductData(products.map((res) => res.data.data));
        } catch (error) {
            console.error('Error fetching favorites:', error.message);
            setError('Failed to load favorite products. Please try again later.');
        } finally {
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        getFavorites();
    }, []);

    return (
        <div className='container mx-auto px-4 py-6'>
            <h1 className='text-[40px] font-bold mb-6 text-center'>❤️ Your Favorites</h1>

            {/* Loading State */}
            {loading && (
                <div className='flex justify-center items-center h-64'>
                    <p className='text-lg font-semibold'>Loading your favorite products...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className='flex justify-center items-center h-64'>
                    <p className='text-red-500 text-lg font-semibold'>{error}</p>
                </div>
            )}

            {/* Display Favorites */}
            {!loading && !error && productData.length > 0 && (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {productData.map((product) => (
                        <ProductCard
                            key={product._id}
                            filepath={filepath}
                            productTitle={product.title}
                            productId={product._id}
                            productImage={product.thumbnail}
                            price={product.price}
                            product={product}
                        />
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && productData.length === 0 && (
                <div className='text-center py-20'>
                    <h2 className='text-xl font-semibold mb-4'>No favorite products found.</h2>
                    <p className='text-gray-500'>Add products to your favorites and they'll appear here.</p>
                </div>
            )}
        </div>
    );
};

export default Favorite;
