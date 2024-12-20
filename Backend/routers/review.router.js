import express from 'express';
import { getAllReviews, giveReview, getProductReview } from '../controllers/review.controller'
import { authenticateToken } from '../utils/token';

const router = express.Router();

router.get('/getallreviews', getAllReviews)
router.post('/givereview/:productId', authenticateToken, giveReview)
router.get(`/productreview/:productId`, getProductReview)

export default router