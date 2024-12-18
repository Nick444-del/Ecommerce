import express from "express";

import { getAllProduct, createProduct, getProductByCategory, getSelfHelp, getBusinessStartup, getProductById, getMangaById, deleteProductById, getMythologyById } from "../controllers/product.controller";

const router = express.Router();

router.get("/getallproduct", getAllProduct);
router.post("/createproduct", createProduct);
router.get("/getproductbycategory/:categoryId", getProductByCategory);
router.get("/getallselfhelp", getSelfHelp);
router.get("/getbusiness", getBusinessStartup)
router.get("/getproductbyid/:productId", getProductById)
router.get("/getmanga", getMangaById)
router.delete("/deleteproductbyid/:productId", deleteProductById)
router.get("/mythologicbook", getMythologyById);

export default router