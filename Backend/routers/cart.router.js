import express from 'express';
import { addProducttoCart, getAllCart, getCartById, increaseCart, decreaseCart, removefromCart, clearCart } from '../controllers/cart.controller.js'
import { authenticateToken } from '../utils/token.js';

const router = express.Router();

router.post(`/addproducttocart/:productId`, authenticateToken, addProducttoCart)
router.get('/getallcart', getAllCart)
router.get('/getcartById', authenticateToken, getCartById)
router.put('/increasecart/:cartId', authenticateToken, increaseCart)
router.put('/decreasecart/:cartId', authenticateToken, decreaseCart)
router.delete('/removefromcart/:cartId', removefromCart)
router.delete('/clearcart', authenticateToken, clearCart)

export default router