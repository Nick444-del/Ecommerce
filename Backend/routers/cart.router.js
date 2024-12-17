import express from 'express';
import { addProducttoCart, getAllCart } from '../controllers/cart.controller'
import validateAddToCart from '../utils/quantity';
import authenticate, { authenticateToken } from '../utils/token';

const router = express.Router();

router.post(`/addproducttocart/:productId`, authenticateToken, addProducttoCart)
router.get('/getallcart', getAllCart)

export default router