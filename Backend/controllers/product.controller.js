import multer from "multer";
import storage from "../utils/image";
import productModel from "../models/product.model";
import { response } from "express";

const upload = multer({ storage: storage })

export const getAllProduct = async (req, res) => {
    try {
        const products = await productModel.find().populate('category');
        return res.status(200).json({
            success: true,
            data: products,
            error: false,
            filePath: "http://localhost:5000/uploads/"
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
        return res.status(200).json({
            success: true,
            data: products,
            error: false,
            filepath: "http://localhost:5000/uploads/"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            error: error
        })
    }
}

export const getSelfHelp = async (req, res) => {
    try {
        const selfhelpId = "67529942e18ae30d846524e2"
        const response = await productModel.find({ category: selfhelpId })
        return res.status(200).json({
            success: true,
            data: response,
            error: false,
            filepath: "http://localhost:5000/uploads/"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            error: error
        })
    }
}

export const getBusinessStartup = async (req, res) => {
    try {
        const businessId = "6756ab8b03a4aa3e285933c6"
        const response = await productModel.find({ category: businessId })
        return res.status(200).json({
            success: true,
            data: response,
            error: false,
            filepath: "http://localhost:5000/uploads"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            error: error
        })
    }
}

export const getProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                data: null,
                error: 'Product not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: product,
            error: false,
            filepath: "http://localhost:5000/uploads/"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            error: error.message
        });
    }
};

export const getMangaById = async (req, res) => {
    try {
        const mangaId = "6752998c124c64b4d3548219";
        const response = await productModel.find({ category: mangaId });
        return res.status(200).json({
            success: true,
            data: response,
            error: false,
            filepath: "http://localhost:5000/uploads"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            error: error
        })
    }
}