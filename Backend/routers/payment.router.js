import express from 'express';
import { createPayment, checkout } from '../controllers/payment.controller.js';
import { authenticateToken } from '../utils/token.js';

const router = express.Router();

router.post('/createpayment', authenticateToken, createPayment)
router.post('/checkout', authenticateToken, checkout)

export default router