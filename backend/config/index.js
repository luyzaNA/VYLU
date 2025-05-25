import express from 'express';
import dotenv from 'dotenv';
import auth_router from "../routes/auth-route.js";
import {errorHandler} from "../middlewares/error-handler.js";
import {connectDB} from "./database.js";
import user_router from "../routes/user-route.js";
import size_router from "../routes/size-route.js";
import material_router from "../routes/material-route.js";
import product_router from "../routes/product-route.js";
import cors from 'cors';

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use(cors());

app.use(auth_router);
app.use(size_router);
app.use(material_router);
app.use(product_router);
app.use(user_router);

app.use(errorHandler);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Credentials', "true");
    next();
});

connectDB().then(() => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT-SECRET not specified');
    }
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});