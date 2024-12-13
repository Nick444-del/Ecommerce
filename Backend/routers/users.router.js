import express from "express";

import { getAllUsers, register, login, updateUser, singleUser, addAddress, addAddressByReq, deleteAddress, adminlogin, deleteUser } from "../controllers/users.controller.js";
import { authenticateToken, admin, authenticate } from "../utils/token.js";

const router = express.Router();

router.get("/getallusers", getAllUsers);
router.post("/register", register);
router.post("/login", login);
router.put("/updateuser/:userId", updateUser);
router.get("/getuser", authenticateToken, singleUser);
router.put("/addaddress/:userId", addAddress);
router.put("/addAddressByReq", authenticateToken, addAddressByReq);
router.delete("/deleteaddress/:addressId", deleteAddress);
router.post("/adminlogin", authenticate, admin, adminlogin);
router.get('/getalluserstoadmin', getAllUsers)
router.delete("/deleteuserinadmin/:userId", deleteUser);

export default router;