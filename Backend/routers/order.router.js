import express from 'express';
import { addOrder, getOrderByToken, getAllOrders } from'../controllers/order.controller'
import { authenticateToken } from '../utils/token';

const router = express.Router();

router.post('/addorder', authenticateToken, addOrder)
router.get('/getorderbytoken', authenticateToken, getOrderByToken)
router.get('/getallorders', getAllOrders)

export default router