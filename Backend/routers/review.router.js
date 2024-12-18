import express from 'express';
import { getAllReviews, giveReview } from '../controllers/review.controller'
import { authenticateToken } from '../utils/token';

const router = express.Router();

router.get('/getallreviews', getAllReviews)
router.post('/givereview/:productId', authenticateToken, giveReview)

export default router