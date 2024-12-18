const validateAddToCart = (req, res, next) => {
    const { quantity } = req.body;
    if(!quantity || quantity <= 0){
        return res.status(400).json({
            success: false,
            error: "Quantity must be a positive number",
        })
    }
    next()
}

export default validateAddToCart