import favoriteModel from "../models/favorite.model.js";

export const getAllFav = async (req, res) => {
    try {
        const response = await favoriteModel.get().populate('product');
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

export const addFavorite = async (req, res) => {
    const userId = req.user.user._id;
    const productId = req.params.productId;
    try {
        const existingProduct = await favoriteModel.findOne({
            user: userId,
            product: productId
        })

        if(existingProduct){
            return res.status(400).json({
                success: false,
                data: null,
                error: "Product already added to favorite"
            })
        }

        const response = await favoriteModel.create({
            user: userId,
            product: productId
        })
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

export const getUserFavorite = async (req, res) => {
    try {
        const userId = req.user.user._id;
        console.log("User ID in Favorite Controller:", userId);

        // Use await to resolve the promise
        const response = await favoriteModel.find({ user: userId });

        return res.status(200).json({
            success: true,
            data: response,
            error: false,
            filepath: 'http://localhost:5000/uploads/'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            error: error.message
        });
    }
};

export const checkFavoriate = async (req, res) => {
    try {
        const productId = req.params.productId;
        const userId = req.user.user._id;
        const response = await favoriteModel.findOne({
            user: userId,
            product: productId
        })
        return res.status(200).json({
            success: true,
            data: response,
            error: false,
            message: "Product is already favorited"
        })
    } catch (error) {
        
    }
}

export const removeFavorite = async (req, res) => {
    try {
        const productId = req.params.productId;
        const userId = req.user.user._id || req.user._id ;
        console.log(productId)
        console.log(userId)
        const response = await favoriteModel.findOneAndDelete({
            user: userId,
            product: productId
        })
        return res.status(200).json({
            success: true,
            data: response,
            error: false,
            message: "Product removed from favorite successfully"
        })
    } catch (error) {
        console.log("Error in deleting favorite: ", error.message);
        return res.status(500).json({
            success: false,
            data: null,
            error: error.message
        })
    }
}