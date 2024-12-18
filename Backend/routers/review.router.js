import express from 'express';
import { getAllReviews, giveReview } from '../controllers/review.controller'

const router = express.Router();

router.get('/getallreviews', getAllReviews)
router.post('/givereview/:productId', giveReview)

export default router