import express from "express";

import { getAllUsers, register, login, updateUser, singleUser, addAddress, addAddressByReq, deleteAddress, adminlogin, deleteUser, changePassword, forgetPassword, verifyOTP, resetPassword, getUserByToken } from "../controllers/users.controller.js";
import { authenticateToken, admin, authenticate } from "../utils/token.js";

const router = express.Router();

router.get("/getallusers", authenticate, admin, getAllUsers);
router.post("/register", register);
router.post("/login", login);
router.put("/updateuser/:userId", updateUser);
router.get("/getuser", authenticateToken, singleUser);
router.put("/addaddress/:userId", addAddress);
router.put("/addAddressByReq", authenticateToken, addAddressByReq);
router.delete("/deleteaddress/:addressId", deleteAddress);
router.post("/adminlogin", authenticate, admin, adminlogin);
router.get('/getalluserstoadmin', authenticate, admin, getAllUsers)
router.delete("/deleteuserinadmin/:userId",  authenticate, admin, deleteUser);
router.put("/changepassword", authenticateToken, changePassword)
router.post("/forgetpassword", forgetPassword)
router.post("/verifyotp", verifyOTP)
router.put("/resetpassword", authenticate, resetPassword)
router.get("/getuserbytoken", authenticateToken, getUserByToken)

export default router;