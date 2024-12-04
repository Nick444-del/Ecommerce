import multer from "multer";
import storage from "../utils/image";
import productModel from "../models/product.model";

const upload = multer({ storage: storage })

export const getAllProduct = async (req, res) => {
    try {
        const products = await productModel.find();
        return res.status(200).json({
            success: true,
            data: products,
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

export const createProduct = async (req, res) => {
    const uploadImageWithData = upload.fields([
        { name: 'image', maxCount: 1 }
    ])
    uploadImageWithData(req, res, async (err) => {
        
    })
}