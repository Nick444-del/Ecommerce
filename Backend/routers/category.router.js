import express from 'express';
import { getAllCategory } from '../controllers/category.controller';

const router = express.Router();

router.get('/getallcategory', getAllCategory);

export default router