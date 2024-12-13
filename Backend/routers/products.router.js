import express from "express";

import { getAllProduct, createProduct, getProductByCategory, getSelfHelp, getBusinessStartup, getProductById, getMangaById } from "../controllers/product.controller";

const router = express.Router();

router.get("/getallproduct", getAllProduct);
router.post("/createproduct", createProduct);
router.get("/getproductbycategory/:categoryId", getProductByCategory);
router.get("/getallselfhelp", getSelfHelp);
router.get("/getbusiness", getBusinessStartup)
router.get("/getproductbyid/:productId", getProductById)
router.get("/getmanga", getMangaById)

export default router