import instance from '../utils/razorpayClient';
import usersModel from '../models/users.model';
import productModel from '../models/product.model';
import cartModel from '../models/cart.model';

export const createPayment = async (req, res) => {
    try {
        const userId = req.user.user._id;
        const { amount, currency } = req.body;
        const userCart = await cartModel.find({ userId }).populate('productId');
        if (!userCart || userCart.length === 0) {
            return res.status(400).json({
                success: false,
                data: null,
                error: "Cart is empty"
            });
        }
        let totalAmount = userCart.reduce((sum, item) => {
            return sum + item.productId.price * item.quantity;
        }, 0);
        totalAmount = totalAmount + 50; 
        totalAmount = totalAmount * 100; 
        const options = {
            amount: totalAmount,
            currency: currency || 'INR',
            receipt: `rcpt_${userId.substring(0, 8)}_${Date.now().toString().slice(-6)}`
        };
        const order = await instance.orders.create(options);
        res.status(200).json({
            success: true,
            orderId: order.id,
            currency: order.currency,
            amount: order.amount,
            shipping: 50 * 100 
        });
    } catch (error) {
        console.error("Payment error:", error);
        res.status(500).json({
            success: false,
            error: error.message || "Something went wrong during payment."
        });
    }
};

export const checkout = async (req, res) => {
    try {
        const userId = req.user.user._id;
        const userCart = await cartModel.find({ userId }).populate('productId');

        if (!userCart || userCart.length === 0) {
            return res.status(400).json({
                success: false,
                data: null,
                error: "Cart is empty"
            });
        }

        let totalAmount = userCart.reduce((sum, item) => {
            return sum + item.productId.price * item.quantity;
        }, 0);
        totalAmount = (totalAmount + 50) * 100; // Include shipping fee

        const options = {
            amount: totalAmount,
            currency: 'INR',
        };

        const order = await instance.orders.create(options);

        return res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        console.error("Checkout Error:", error.message);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


export const paymentVerification = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}