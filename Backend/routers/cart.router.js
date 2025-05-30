import express from 'express';
import { addProducttoCart, getAllCart, getCartById, increaseCart, decreaseCart, removefromCart } from '../controllers/cart.controller'
import validateAddToCart from '../utils/quantity';
import authenticate, { authenticateToken } from '../utils/token';

const router = express.Router();

router.post(`/addproducttocart/:productId`, authenticateToken, addProducttoCart)
router.get('/getallcart', getAllCart)
router.get('/getcartById', authenticateToken, getCartById)
router.put('/increasecart/:cartId', authenticateToken, increaseCart)
router.put('/decreasecart/:cartId', authenticateToken, decreaseCart)
router.delete('/removefromcart/:cartId', removefromCart)

export default router