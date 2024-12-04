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
    address: [{
        type: schema.Types.ObjectId,
        ref: 'address'
    }],
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("users", userSchema)