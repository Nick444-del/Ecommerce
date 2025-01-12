import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

import userRouter from './routers/users.router.js'
import productRouter from './routers/products.router.js'
import addressRouter from './routers/address.router.js'
import categoryRouter from './routers/category.router.js'
import cartRouter from './routers/cart.router.js'
import reviewRouter from './routers/review.router.js'
import favoriteRouter from './routers/favorite.router.js'
import ContactRouter from './routers/contact.router.js'
import paymentRouter from './routers/payment.router.js'
import orderRouter from './routers/order.router.js'

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(
    cors({
        origin: "*",
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type,Authorization',
    })
)

app.get('/', (req, res) => {
    res.send("Hello World")
})

mongoose.connect(process.env.MONGO_URL).then(() => console.log("Database connection established")).catch((err) => console.log(err))

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

app.use(userRouter);
app.use(productRouter);
app.use(addressRouter);
app.use(categoryRouter);
app.use(cartRouter);
app.use(reviewRouter);
app.use(favoriteRouter);
app.use(ContactRouter);
app.use(paymentRouter);
app.use(orderRouter)