import multer from "multer";
import storage from "../utils/image";
import productModel from "../models/product.model";
import { response } from "express";

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
    const uploadImageWithData = upload.fields([{ name: 'thumbnail', maxCount: 1 }]);
    uploadImageWithData(req, res, async (err) => {
        if (err) {
            return res.status(500).json({
                error: true,
                success: false,
                message: `File upload error: ${err.message}`
            })
        }
        try {
            let thumbnail = null;
            if (req.files["thumbnail"]) {
                thumbnail = req.files["thumbnail"][0].filename;
            }
            const { title, category, price, quantity, author, descriptions } = req.body;
            const newProduct = await productModel.create({
                title: title,
                category: category,
                price: price,
                quantity: quantity,
                descriptions: descriptions,
                thumbnail: thumbnail,
                author: author
            });
            return res.status(201).json({
                error: false,
                success: true,
                data: newProduct
            })
        } catch (error) {
            return res.status(500).json({
                error: true,
                success: false,
                message: `Server error: ${error.message}`
            })
        }
    })
}

export const getProductByCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const products = await productModel.find({ category: categoryId });
        const updateProduct = products.map((product) => ({
            ...product._doc,
            thumbnail: product.thumbnail ? `/uploads/${product.thumbnail}` : null
        }))
        return res.status(200).json({
            success: true,
            data: updateProduct,
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