import mongoose from "mongoose";

const schema = mongoose.Schema;

const addressSchema = new schema({
    fullname: {
        type: String,
        // required: true
    },
    mobile: {
        type: Number,
        // required: true
    },
    address: {
        type: String,
        // required: true
    },
    state: {
        type: String,
        // required: true
    },
    city: {
        type: String,
    },
    pincode: {
        type: Number,
        // required: true
    }
})

export default mongoose.model('address', addressSchema);