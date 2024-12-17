import mongoose from "mongoose";

const schema = mongoose.Schema;

const productModel = new schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'category'  
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    descriptions: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        default: null
    },
    author: {
        type: String,
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});

export default mongoose.model("product", productModel);