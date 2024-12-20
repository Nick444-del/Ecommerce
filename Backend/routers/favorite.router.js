import express from 'express';
import { getAllFav, addFavorite, getUserFavorite } from '../controllers/favorite.controller';
import { authenticateToken } from '../utils/token';

const router = express.Router();

router.get('/getallfav', getAllFav);
router.post('/addfavorite/:productId', authenticateToken, addFavorite);
router.get('/getuserfav', authenticateToken, getUserFavorite);

export default router;