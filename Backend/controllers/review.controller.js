import reviewModel from "../models/review.model";

export const getAllReviews = async (req, res) => {
    try {
        const response = await reviewModel.find().populate("usersId").populate("productId");
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
        const usersId = req.user.user._id; // Corrected property access (`req.user.user._id` -> `req.user._id`)
        console.log("Review User ID: "+usersId)
        const productId = req.params.productId;
        const { rating, review } = req.body;

        if (!rating || !review) {
            return res.status(400).json({
                success: false,
                error: "Rating and review are required fields."
            });
        }

        const newReview = await reviewModel.create({
            usersId,
            productId,
            rating,
            review
        });

        return res.status(201).json({
            success: true,
            data: newReview,
            error: false
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export const getProductReview = async (req, res) => {
    try {
        const productId = req.params.productId;
        const response = await reviewModel.find({ productId: productId }).populate('usersId').populate('productId');
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