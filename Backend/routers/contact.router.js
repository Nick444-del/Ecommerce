// contact.router.js
import express from 'express';
import { sendContactEmail, postPaymentSuccessMail } from '../controllers/contact.controller.js';
import { authenticateToken } from '../utils/token.js'

const router = express.Router();

// Define contact form route
router.post('/api/contact', sendContactEmail);
router.post('/api/payments', authenticateToken, postPaymentSuccessMail);

export default router;
