import mongoose, { model } from 'mongoose';

const schema = mongoose.Schema;

const favoriteModel = new schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'product'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("favorite", favoriteModel)