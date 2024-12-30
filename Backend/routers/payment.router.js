import express from 'express';
import { createPayement } from '../controllers/payment.controller';
import { authenticateToken } from '../utils/token';

const router = express.Router();

router.post('/createpayment', authenticateToken, createPayement)

export default router