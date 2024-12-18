import React, { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../../Components/utils/axiosInstance'


const AddReview = ({ onClose, productId }) => {
    console.log('Product ID in AddReview: ' + productId)

    const [rating, setRating] = useState("")
    const [review, setReview] = useState("")

    const handleReviewSubmit = async () => {
        try {
            const response = await axiosInstance.post(`/givereview/${productId}`)
            if(response.status === 200){
                console.log(response.data.data)
            }
        } catch (error) {
            
        }
    }
    return (
        <div className="relative">
            <button
                className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-white transition-all ease-in-out"
                onClick={onClose}
            >
                <CloseIcon className="text-xl text-red-700" />
            </button>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <h3 className='text-lg font-semibold'>Give Review</h3>
                        <label htmlFor="rating" className="text-sm font-medium text-gray-700">
                            Rating
                        </label>
                        <select
                            name="rating"
                            id="rating"
                            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        >
                            <option value="1 - Poor">1 - Poor</option>
                            <option value="2 - Fair">2 - Fair</option>
                            <option value="3 - Good">3 - Good</option>
                            <option value="4 - Very Good">4 - Very Good</option>
                            <option value="5 - Excellent">5 - Excellent</option>
                        </select>
                    </div>

                    <label className="text-sm font-medium">Review</label>
                    <input className='input-box' onChange={(e) => setReview(e.target.value)} value={review} type="text" name="comment" id="" />
                </div>
                <button
                    onClick={() => handleReviewSubmit()}
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-white hover:text-black"
                >
                    Submit Review
                </button>
            </div>
        </div>
    )
}

export default AddReview