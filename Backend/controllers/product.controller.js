import multer from "multer";
import storage from "../utils/image.js";
import productModel from "../models/product.model.js";
import fs from "fs"

const upload = multer({ storage: storage })

export const getAllProduct = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit

        const products = await productModel.find().populate('category').skip(skip).limit(limit);

        const totalDocuments = await productModel.countDocuments()

        return res.status(200).json({
            success: true,
            data: products,
            error: false,
            currentPage: page,
            totalPages: Math.ceil(totalDocuments / limit),
            totalProducts: totalDocuments,
            filePath: "http://localhost:5000/uploads/",
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

export const getMythologyById = async (req, res) => {
    try {
        const mythologyId = "675bf65f4838681b49322b82";
        const response = await productModel.find({ category: mythologyId })
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

export const deleteProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const deletedProduct = await productModel.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                data: null,
                error: 'Product not found'
            });
        }
        if (deletedProduct.thumbnail) {
            console.log(`./uploads/${deletedProduct.thumbnail}`)
            console.log('Deleting product with thumbnail:' + deletedProduct.thumbnail)
            fs.unlinkSync(`./uploads/${deletedProduct.thumbnail}`);
        }
        return res.status(200).json({
            success: true,
            data: deletedProduct,
            error: false
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            error: error.message
        })
    }
}

export const favoriteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const response = await productModel.findById({ _id: productId })
        return res.status(200).json({
            success: true,
            data: response,
            error: false
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            error: error.message
        })
    }
}

export const newArrival = async (req, res) => {
    try {
        const fifteenDaysAgo = new Date();
        fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15)
        const newArrival = await productModel.find({
            date: { $gte: fifteenDaysAgo }
        }).sort({ date: -1 })

        return res.status(200).json({
            success: true,
            message: "New arrival products fetched successfully",
            data: newArrival,
            filePath: "http://localhost:5000/uploads/"
        })
    } catch (error) {
        console.error("Error fetching new arrival products:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch new arrival products.",
            error: error.message
        });
    }
}

export const editProduct = async (req, res) => {
    const productId = req.params.productId;
    const updateDataWithImage = upload.fields([{ name: 'thumbnail', maxCount: 1 }])
    updateDataWithImage(req, res, async (err) => {
        if (err) {
            return res.status(500).json({
                error: true,
                success: false,
                message: `File upload error: ${err.message}`
            })
        }

        const find = await productModel.findById(productId)
        if (!find) {
            return res.status(404).json({
                error: true,
                success: false,
                message: "Product not found"
            })
        }
        try {
            let thumbnail = find.thumbnail;
            if(req.files["thumbnail"]){
                thumbnail = req.files["thumbnail"][0].filename;
            }
            const { title, category, price, quantity, author, descriptions } = req.body;
            await productModel.updateOne({ _id: productId }, {
                title: title,
                category: category,
                price: price,
                quantity: quantity,
                descriptions: descriptions,
                thumbnail: thumbnail,
                author: author
            })
            return res.status(200).json({
                error: false,
                success: true,
                message: "Product updated successfully"
            })
        } catch (error) {
            return res.status(500).json({
                error: true,
                success: false,
                message: error.message
            })
        }
    })
}

export const updateProductQuantity = async (req, res) => {
    try {
        const productId = req.params.productId;
        const { quantity } = req.body;
        const updatedProduct = await productModel.findByIdAndUpdate(productId, { quantity }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }
        return res.status(200).json({ success: true, message: 'Product quantity updated successfully.', product: updatedProduct });
    } catch (error) {
        console.error('Error updating product quantities:', error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

export const searchProduct = async (req, res) => {
    try {
        const { query } = req.query;
        if(!query){
            return res.status(400).json({ message: "Search query is required" });
        }

        const product = await productModel.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
                { author: { $regex: query, $options: "i" } }
            ]
        })

        if(product.length === 0){
            return res.status(404).json({ message: "No products found" });
        }

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: product,
            filePath: "http://localhost:5000/uploads/"
        })
    } catch (error) {
        console.error("Error searching products:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const totalProducts = async (req, res) => {
    try {
        const totalProducts = await productModel.find()
        return res.status(200).json({
            success: true,
            message: "Total products fetched successfully",
            data: totalProducts
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch total products",
            error: error.message
        })
    }
}