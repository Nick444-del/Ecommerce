import categoryModel from "../models/category.model";
import storage from "../utils/image"

export const getAllCategory = async (req, res) => {
    try {
        const response = await categoryModel.find();
        return res.status(200).json({
            error: false,
            success: true,
            data: response
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            success: false,
            message: error.message
        })
    }
}

export const createCategory = async (req, res) => {
    
}