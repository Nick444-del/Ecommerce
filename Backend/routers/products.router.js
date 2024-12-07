import express from "express";

import { getAllProduct, createProduct, getProductByCategory } from "../controllers/product.controller";

const router = express.Router();

router.get("/getallproduct", getAllProduct);
router.post("/createproduct", createProduct);
router.get("/getproductbycategory/:categoryId", getProductByCategory);

export default router