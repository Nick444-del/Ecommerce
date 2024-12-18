import express from 'express';
import { getAllCategory, createCategory, getCategoryId, deleteCategory, getCategoriesByIds } from '../controllers/category.controller';

const router = express.Router();

router.get('/getallcategory', getAllCategory);
router.post('/createCategory', createCategory);
router.get('/getcategorybyid/:categoryId', getCategoryId);
router.delete('/deletecategory/:categoryId', deleteCategory)
router.post('/getcategoriesbyids', getCategoriesByIds)

export default router