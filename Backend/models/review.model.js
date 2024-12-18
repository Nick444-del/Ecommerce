import mongoose from "mongoose";

const schema = mongoose.Schema;

const reviewModel = new schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'product'
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    rating: {
        type: Array,
        required: true,
        default: [1, 2, 3, 4, 5]
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