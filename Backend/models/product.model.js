import mongoose from "mongoose";

const schema = mongoose.Schema;

const productSchema = new schema({
    title: {
        type: String,
        required: true
    }
})

export default mongoose.model('product', productSchema);