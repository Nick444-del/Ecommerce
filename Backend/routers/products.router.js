import express from "express";

import { getAllProduct, createProduct, getProductByCategory, getSelfHelp, getBusinessStartup, getProductById, getMangaById, deleteProductById, getMythologyById, favoriteProduct, newArrival, editProduct, updateProductQuantity } from "../controllers/product.controller";
import { authenticateToken, admin, authenticate } from "../utils/token.js";

const router = express.Router();

router.get("/getallproductinadmin", getAllProduct);
router.get("/getallproduct", getAllProduct);
router.post("/createproduct", authenticate, admin, createProduct);
router.get("/getproductbycategory/:categoryId", getProductByCategory);
router.get("/getallselfhelp", getSelfHelp);
router.get("/getbusiness", getBusinessStartup)
router.get("/getproductbyid/:productId", getProductById)
router.put("/editproduct/:productId", editProduct)
router.get("/getmanga", getMangaById)
router.delete("/deleteproductbyid/:productId", authenticate, admin, deleteProductById)
router.get("/mythologicbook", getMythologyById);
router.get("/favoriteproduct/:productId", favoriteProduct)
router.get("/newarrivals", newArrival)
router.put("/updatestock/:productId", updateProductQuantity)

export default router