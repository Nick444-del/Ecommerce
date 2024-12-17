import cartModel from "../models/cart.model"

export const addProducttoCart = async (req, res) => {
    try {
        const productId = req.params.productId;
        const userId = req.user.user._id;
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                data: null,
                error: "Product not found"
            });
        }
        const user = await usersModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                data: null,
                error: "User not found"
            });
        }
        const response = await cartModel.create({
            userId: userId,
            productId: productId
        })
        return res.status(200).json({
            success: true,
            data: response,
            error: false
        })
    } catch (error) {
        console.error("Error adding product to cart:", error);
        return res.status(500).json({
            success: false,
            data: null,
            error: "An internal server error occurred" + error.message
        });
    }
};

export const getAllCart = async (req, res) => {
    try {
        const response = await cartModel.find().populate("userId").populate("productId");
        return res.status(200).json({
            success: true,
            data: response,
            error: false
        })
    } catch (error) {
        console.error("Error fetching cart items:", error);
        return res.status(500).json({
            success: false,
            data: null,
            error: "An internal server error occurred",
        });
    }
};

