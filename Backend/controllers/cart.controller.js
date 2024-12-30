import cartModel from "../models/cart.model"
import usersModel from "../models/users.model"
import productModel from "../models/product.model"

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

        const existingCartItem = await cartModel.findOne({ userId, productId })

        if(existingCartItem){
            existingCartItem.quantity += 1;
            await existingCartItem.save();
            return res.status(200).json({
                success: true,
                data: existingCartItem,
                error: false,
                message: "Product quantity has been updated"
            })
        }

        const response = await cartModel.create({
            userId: userId,
            productId: productId
        })
        return res.status(200).json({
            success: true,
            data: response,
            error: false,
            message: "Product added to cart successfully!"
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
            error: false,
            filepath: "http://localhost:5000/uploads/"
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

export const getCartById = async (req, res) => {
    try {
        const userId = req.user.user._id;
        const response = await cartModel.find({ userId: userId }).populate("userId").populate("productId");
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
            error: error.message
        })
    }
}

export const increaseCart = async (req, res) => {
    try {
        const cartId = req.params.cartId;
        // 1. Fetch the cart item by cartId
        const cartItem = await cartModel.findById(cartId).populate("userId").populate("productId");
        // 2. Check if the cart item exists
        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        // 3. Check if the quantity is greater than 0
        if (cartItem.quantity <= 0) {
            return res.status(400).json({ message: "Invalid quantity to increase" });
        }
        // 4. Update the quantity of the cart item
        cartItem.quantity += 1; // Increase quantity by 1
        // 5. Save the updated cart item
        const updatedCart = await cartItem.save();
        return res.status(200).json({ message: "Cart updated successfully", cart: updatedCart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const decreaseCart = async (req, res) => {
    try {
        const cartId = req.params.cartId;

        // Find the cart item
        const cartItem = await cartModel.findById(cartId).populate("userId").populate("productId");

        // Check if the cart item exists
        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        // Ensure quantity doesn't go below 1
        if (cartItem.quantity <= 1) {
            return res.status(400).json({ message: "Quantity cannot be less than 1" });
        }

        // Decrease quantity
        cartItem.quantity -= 1;

        // Save the updated cart
        const updatedCart = await cartItem.save();

        return res.status(200).json({ message: "Cart updated successfully", cart: updatedCart });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error: " + error.message });
    }
};

export const removefromCart = async (req, res) => {
    try {
        const cartId = req.params.cartId;

        // Find the cart item by its ID
        const cartItem = await cartModel.findById(cartId);
        if (!cartItem) {
            return res.status(404).json({
                message: "Cart item not found",
            });
        }

        // Delete the cart item using the correct method
        await cartModel.deleteOne({ _id: cartId });

        // Send a success response
        return res.status(200).json({
            message: "Cart item deleted successfully",
        });
    } catch (error) {
        // Handle errors gracefully
        return res.status(500).json({
            message: "Internal server error: " + error.message,
        });
    }
};