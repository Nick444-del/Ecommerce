import addressModel from "../models/address.model";

export const getAllAddress = async (req, res) => {
    try {
        const getAddress = await addressModel.find().populate("address")
        return res.status(200).json({
            success: true,
            data: getAddress,
            error: false
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            error: error
        })
    }
}

export const createAddress = async (req, res) => {
    try {
        const { fullname, mobile, address, state, city, pincode } = req.body;
        const createAddress = await addressModel.create({
            fullname: fullname,
            mobile: mobile,
            address: address,
            state: state,
            city: city,
            pincode: pincode
        })
        return res.status(200).json({
            success: true,
            data: createAddress,
            error: false
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            error: error
        })
    }
}

export const addresses = async (req, res) => {
    try {
        const id = req.params.id;
        const getAddress = await addressModel.findById(id)
        return res.status(200).json({
            success: true,
            data: getAddress,
            error: false
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            error: error
        })
    }
}