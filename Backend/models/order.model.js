import mongoose from "mongoose";

const schema = mongoose.Schema;

const orderModel = new schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'product'
    },
    quantity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("order", orderModel)