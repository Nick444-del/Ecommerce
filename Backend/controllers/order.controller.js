import orderModel from "../models/order.model.js";

export const addOrder = async (req, res) => {
    try {
        const userId = req.user.user._id;
        const { productId, quantity } = req.body;

        const newOrder = await orderModel.create({
            userId,
            productId,
            quantity
        })
        if(!newOrder){
            return res.status(500).json({
                success: false,
                data: null,
                error: "Order not created"
            })
        }
        return res.status(200).json({
            success: true,
            data: newOrder,
            error: null
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            error: error.message
        })
    }
}

export const getOrderByToken = async (req, res) => {
    try {
        const userId = req.user.user._id;
        const orders = await orderModel.find({ userId }).populate('productId');
        if(!orders){
            return res.status(500).json({
                success: false,
                data: null,
                error: "Orders not found"
            })
        }
        return res.status(200).json({
            success: true,
            data: orders,
            error: null,
            filepath: "http://localhost:5000/uploads/"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            error: error.message
        })
    }
}

export const getAllOrders = async (req, res) => {
    try {
        // Extract page and limit from query parameters
        const page = parseInt(req.query.page) || 1; // Default page is 1
        const limit = parseInt(req.query.limit) || 10; // Default limit is 10 items per page

        // Calculate the number of documents to skip
        const skip = (page - 1) * limit;

        // Fetch orders with pagination, populate userId and productId
        const response = await orderModel
            .find()
            .populate('userId')
            .populate('productId')
            .skip(skip)
            .limit(limit);

        // Get the total count of documents (for pagination info)
        const totalDocuments = await orderModel.countDocuments();

        return res.status(200).json({
            success: true,
            data: response,
            error: false,
            message: "Data fetched successfully",
            currentPage: page,
            totalPages: Math.ceil(totalDocuments / limit),
            totalOrders: totalDocuments,
            filepath: "http://localhost:5000/uploads/"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            error: error.message
        });
    }
};

export const getAllOrder = async (req, res) => {
    try {
        const response = await orderModel.find();
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
