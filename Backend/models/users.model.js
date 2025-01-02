import mongoose from "mongoose";

const schema = mongoose.Schema;

const userSchema = new schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    address: [{
        type: schema.Types.ObjectId,
        ref: 'address'
    }],
    password: {
        type: String,
        required: true
    },
    otp:{
        otp: { type: String },
        sendTime: { type: Number },
        token: { type: String }
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("users", userSchema)