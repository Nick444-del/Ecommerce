import { instance } from '../utils/razorpayClient'
import usersModel from '../models/users.model'
import productModel from '../models/product.model'
import cartModel from '../models/cart.model'

export const createPayement = async (req, res) => {
    try {
        const userId = req.user.user._id;
        const { amount, currency } = req.body;
        const userCart = await cartModel.find({ userId }).populate('productId')
        if(!userCart || userCart.length === 0){
            return res.status(400).json({
                success: false,
                data: null,
                error: "Cart is empty"
            })
        }
        let totalAmount = userCart.reduce((sum, item) => {
            return sum + item.productId.price * item.quantity
        }, 0)
        totalAmount = totalAmount + 50;
        totalAmount = totalAmount * 100;
        const options = {
            amount: totalAmount,
            currency: 'INR',
            receipt: `receipt_${userId}_${Date.now()}`
        }
        const order = await instance.orders.create(options)
        res.status(200).json({
            success: true,
            orderId: order.id,
            currency: order.currency,
            amount: order.amount,
            shipping: 50 * 100 // Shipping fee in paise
        });
    } catch (error) {
        
    }
}