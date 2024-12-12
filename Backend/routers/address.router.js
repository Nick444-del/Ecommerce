import express from 'express';

import { getAllAddress, createAddress, addresses, deleteAddress } from '../controllers/address.controller.js';

const router = express.Router();

router.get('/getalladdress', getAllAddress)
router.post('/adduseraddress', createAddress)
router.get('/addresses/:id', addresses)
router.delete('/deleteaddress/:addressId', deleteAddress);

export default router