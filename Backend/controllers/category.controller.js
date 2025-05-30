import multer from "multer";
import categoryModel from "../models/category.model";
import storage from "../utils/image"
import fs from "fs";

const upload = multer({ storage: storage });

export const getAllCategory = async (req, res) => {
    try {
        const response = await categoryModel.find();
        return res.status(200).json({
            error: false,
            success: true,
            data: response,
            filepath: 'http://localhost:5000/uploads/'
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
    const uploadImageWithData = upload.fields([{ name: "categoryImage", maxCount: 1 }]);
    uploadImageWithData(req, res, async (err) => {
        if (err) {
            return res.status(500).json({
                error: true,
                success: false,
                message: `File upload error: ${err.message}`
            });
        }
        try {
            let categoryImage = null;
            if (req.files["categoryImage"]) {
                categoryImage = req.files["categoryImage"][0].filename;
            }
            const { categoryName } = req.body;
            const newCategory = await categoryModel.create({
                categoryName: categoryName,
                categoryImage: categoryImage
            });
            return res.status(201).json({
                error: false,
                success: true,
                data: newCategory
            });
        } catch (err) {
            return res.status(500).json({
                error: true,
                success: false,
                message: `Server error: ${err.message}`
            });
        }
    });
};

export const getCategoryId = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const response = await categoryModel.find({ _id: categoryId });
        return res.status(200).json({
            error: false,
            success: true,
            data: response,
            filepath: "http://localhost:5000/uploads/"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            success: false,
            message: error.message
        })
    }
}

export const deleteCategory = async (req, res) => {
    const categoryId = req.params.categoryId
    const deleteDataWithImage = upload.fields([{ name: 'categoryImage', maxCount: 1 }])
    deleteDataWithImage(req, res, async (err) => {
        if (err) return res.status(500).json({ error: true, success: false, message: `File upload error: ${err.message}` })
        try {
            const data = await categoryModel.findById(categoryId)
            if (!data) return res.status(404).json({ error: true, success: false, message: "Category not found" })
            if (data.categoryImage) {
                const image = data.categoryImage
                const path = `./uploads/${image}`
                if (fs.existsSync(path)) {
                    fs.unlinkSync(path)
                }
                await categoryModel.deleteOne({ _id: categoryId })
                return res.status(200).json({ error: false, success: true, message: "Category deleted successfully" })
            }
        } catch (error) {
            return res.status(500).json({ error: true, success: false, message: error.message })
        }
    })
}

export const updateCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    const updateDateWithImage = upload.fields([{ name: 'categoryImage', maxCount: 1 }])
    updateDateWithImage(req, res, async (err) => {
        if (err) {
            return res.status(500).json({
                error: true,
                success: false,
                message: `File upload error: ${err.message}`
            })
        }
        const find = await categoryModel.findById(categoryId);
        if(!find){
            return res.status(404).json({
                error: true,
                success: false,
                message: "Category not found"
            })
        }
        try {
            let img = find.categoryImage;
            if (req.files["categoryImage"]) {
                img = req.files["categoryImage"][0].filename;
            }
            const { categoryName } = req.body;
            await categoryModel.updateOne({ _id: categoryId }, {
                categoryName: categoryName,
                categoryImage: img
            })
            return res.status(200).json({
                error: false,
                success: true,
                message: "Category updated successfully"
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

export const getCategoriesByIds = async (req, res) => {
    try {
        const { ids } = req.body; // Expecting an array of category IDs in the request body

        if (!Array.isArray(ids)) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Invalid data format. 'ids' should be an array.",
            });
        }

        const categories = await Category.find({ _id: { $in: ids } });

        return res.status(200).json({
            success: true,
            data: categories,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message,
        });
    }
};