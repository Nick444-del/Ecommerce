import multer from "multer";
import categoryModel from "../models/category.model";
import storage from "../utils/image"

const upload = multer({ storage: storage });

export const getAllCategory = async (req, res) => {
    try {
        const response = await categoryModel.find();
        const updatedCategories = response.map((category) => ({
            ...category._doc, // Spread the original document properties
            categoryImage: category.categoryImage ? `/uploads/${category.categoryImage}` : null,
        }));
        return res.status(200).json({
            error: false,
            success: true,
            data: updatedCategories
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