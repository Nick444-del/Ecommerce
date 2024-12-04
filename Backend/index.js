import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRouter from './routers/users.router'
import productRouter from './routers/products.router'
import addressRouter from './routers/address.router'

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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