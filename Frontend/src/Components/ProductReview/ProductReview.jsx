import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import StarIcon from '@mui/icons-material/Star';

const ProductReviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReviews = async () => {
        try {
            const response = await axiosInstance.get(`/productreview/${productId}`);
            if (response.data.success) {
                setReviews(response.data.data || []);
            } else {
                setError(response.data.message || 'Unable to fetch reviews.');
            }
        } catch (error) {
            setError(error.message || 'Unable to fetch reviews.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [productId]);

    if (loading) {
        return <div className="text-center mt-5">Loading reviews...</div>;
    }

    if (error) {
        return <div className="text-center mt-5 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="mt-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">Customer Reviews</h2>
            {reviews.length === 0 ? (
                <p className="text-lg text-gray-600 mt-4">No reviews yet. Be the first to review this product!</p>
            ) : (
                <div className="space-y-6 mt-6">
                    {reviews.map((review) => (
                        <div
                            key={review._id}
                            className="bg-white p-5 rounded-lg shadow-md flex flex-col md:flex-row gap-4"
                        >
                            {/* User Info */}
                            <div className="text-lg font-bold text-gray-800">
                                {review.usersId.fullname || 'Anonymous'}
                            </div>

                            {/* Rating */}
                            <div className="flex items-center text-yellow-500">
                                {[...Array(parseInt(review.rating[0]))].map((_, index) => (
                                    <StarIcon key={index} />
                                ))}
                                {[...Array(5 - parseInt(review.rating[0]))].map((_, index) => (
                                    <StarIcon key={index} style={{ color: '#ddd' }} />
                                ))}
                                <span className="ml-2 text-gray-700">{review.rating.split(' - ')[1]}</span>
                            </div>

                            {/* Review Text */}
                            <div className="text-gray-700 mt-2">{review.review}</div>

                            {/* Review Date */}
                            <div className="text-sm text-gray-500 mt-2">
                                {new Date(review.data).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductReviews;
