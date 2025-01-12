import express from 'express';
import { addOrder, getOrderByToken, getAllOrders, getAllOrder } from'../controllers/order.controller.js'
import { authenticateToken } from '../utils/token.js';

const router = express.Router();

router.post('/addorder', authenticateToken, addOrder)
router.get('/getorderbytoken', authenticateToken, getOrderByToken)
router.get('/getallorders', getAllOrders)
router.get('/getallorder', getAllOrder)

export default router