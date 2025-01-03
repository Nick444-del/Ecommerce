import express from 'express';
import { getAllFav, addFavorite, getUserFavorite, checkFavoriate, removeFavorite } from '../controllers/favorite.controller';
import { authenticateToken } from '../utils/token';

const router = express.Router();

router.get('/getallfav', getAllFav);
router.post('/addfavorite/:productId', authenticateToken, addFavorite);
router.get('/getuserfav', authenticateToken, getUserFavorite);
router.get('/checkfavorite/:productId', authenticateToken, checkFavoriate);
router.delete('/removefavorite/:productId', authenticateToken, removeFavorite);

export default router;