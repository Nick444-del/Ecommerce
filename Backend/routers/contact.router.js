// contact.router.js
import express from 'express';
import { sendContactEmail } from '../controllers/contact.controller.js';

const router = express.Router();

// Define contact form route
router.post('/api/contact', sendContactEmail);

export default router;
