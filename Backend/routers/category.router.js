import express from 'express';
import { getAllCategory, createCategory } from '../controllers/category.controller';

const router = express.Router();

router.get('/getallcategory', getAllCategory);
router.post('/createCategory', createCategory);

export default router