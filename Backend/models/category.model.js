import mongoose from "mongoose";

const schema = mongoose.Schema;

const categoryModel = new schema({
    categoryImage: {
        type: String,
        default: null
    },
    categoryName: {
        type: String,
        required: true
    },
    date: { type: Date, default: Date.now },
})

export default mongoose.model('category', categoryModel);