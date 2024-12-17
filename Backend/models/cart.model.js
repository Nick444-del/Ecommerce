import mongoon from "mongoose";

const schema = mongoon.Schema;

const cartModel = new schema({
    userId: {
        type: schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    productId: {
        type: schema.Types.ObjectId,
        required: true,
        ref: 'product'
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    data: {
        type: Date,
        default: Date.now
    }
})

export default mongoon.model("cart", cartModel)