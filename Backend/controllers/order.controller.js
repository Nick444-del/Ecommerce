import orderModel from "../models/order.model";

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