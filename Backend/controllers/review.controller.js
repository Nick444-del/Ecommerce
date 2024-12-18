import reviewModel from "../models/review.model";

export const getAllReviews = async (req, res) => {
    try {
        const response = await reviewModel.find();
        return res.status(200).json({
            success: true,
            data: response,
            error: false
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            error: error
        })
    }
}

export const giveReview = async (req, res) => {
    try {
        const userId = req.user.user._id;
        const productId = req.params.productId;
        const { rating, review }  = req.body;
        const response = await reviewModel.create({
            userId: userId,
            productId: productId,
            rating: rating,
            review: review
        })
        return res.status(200).json({
            success: true,
            data: response,
            error: false
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            error: error.message
        })
    }
}