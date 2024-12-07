import express from 'express';
import { getAllCategory, createCategory, getCategoryId } from '../controllers/category.controller';

const router = express.Router();

router.get('/getallcategory', getAllCategory);
router.post('/createCategory', createCategory);
router.get('/getcategorybyid/:categoryId', getCategoryId);

export default router