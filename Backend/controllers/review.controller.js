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
        const userId = req.user._id; // Corrected property access (`req.user.user._id` -> `req.user._id`)
        const productId = req.params.productId;
        const { rating, review } = req.body;

        if (!rating || !review) {
            return res.status(400).json({
                success: false,
                error: "Rating and review are required fields."
            });
        }

        const newReview = await reviewModel.create({
            userId,
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
