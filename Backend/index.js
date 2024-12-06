import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

import userRouter from './routers/users.router'
import productRouter from './routers/products.router'
import addressRouter from './routers/address.router'
import categoryRouter from './routers/category.router'

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(
    cors({
        origin: "*",
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