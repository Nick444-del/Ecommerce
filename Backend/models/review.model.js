import mongoose from "mongoose";

const schema = mongoose.Schema;

const reviewModel = new schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'product'
    },
    usersId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    rating: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("review", reviewModel)