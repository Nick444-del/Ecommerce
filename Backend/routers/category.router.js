import express from 'express';
import { getAllCategory, createCategory, getCategoryId, deleteCategory } from '../controllers/category.controller';

const router = express.Router();

router.get('/getallcategory', getAllCategory);
router.post('/createCategory', createCategory);
router.get('/getcategorybyid/:categoryId', getCategoryId);
router.delete('/deletecategory/:categoryId', deleteCategory)

export default router