import express from 'express';
import { addOrder, getOrderByToken } from'../controllers/order.controller'
import { authenticateToken } from '../utils/token';

const router = express.Router();

router.post('/addorder', authenticateToken, addOrder)
router.get('/getorderbytoken', authenticateToken, getOrderByToken)

export default router