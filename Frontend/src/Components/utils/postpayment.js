import axiosInstance from "./axiosInstance"


// {
//     "razorpay_payment_id": "pay_PeUB0ZmVeRfxMC",
//     "razorpay_order_id": "order_PeUAXbQDaGeJRm",
//     "razorpay_signature": "3b2c013d8f84e2ade831b74ed5b4b5d4533a51747f4aabcfbe8c19b0b85463f9"
// }

export const postPayment = async (cartData) => {
    console.log("Cart Data for Order Creation:", cartData);

    try {
        // Check if cartData is a valid array
        if (!Array.isArray(cartData) || cartData.length === 0) {
            console.error("Invalid cartData structure. Expected an array:", cartData);
            throw new Error("Invalid cartData: Expected an array of cart items.");
        }

        for (const item of cartData) {
            if (!item || !item.productId || !item.quantity || !item.userId) {
                console.error("Invalid cart item structure:", item);
                throw new Error("Invalid cart item: Missing required fields.");
            }
            const addOrder = await axiosInstance.post("/addorder", {
                userId: item.userId,
                productId: item.productId._id,
                quantity: item.quantity,
            });

            const updataStock = await axiosInstance.put(`/updatestock/${item.productId._id}`, {
                quantity: item.productId.quantity - item.quantity
            })

            if (!updataStock.data.success) {
                console.error("Failed to update stock for item:", item);
            }else{
                console.log("Stock Updated:", updataStock?.data);
            }

            console.log("Order Added:", addOrder?.data);

            if (!addOrder.data.success) {
                console.error("Failed to add order for item:", item);
            }
        }
        const clearcart = await axiosInstance.delete('/clearcart')
        if (clearcart) {
            console.log("Clearcart success")
        }

    } catch (error) {
        console.error("Error in postPayment:", error.message);
    }
};