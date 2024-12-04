import express from "express";

import { getAllUsers, register, login, updateUser, singleUser, addAddress } from "../controllers/users.controller.js";
import { authenticateToken } from "../utils/token.js";

const router = express.Router();

router.get("/getallusers", getAllUsers);
router.post("/register", register);
router.post("/login", login);
router.put("/updateuser/:userId", updateUser);
router.get("/getuser", authenticateToken, singleUser);
router.put("/addaddress/:userId", addAddress);

export default router;