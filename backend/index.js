import express from 'express';
import bodyParser from 'body-parser';
import userRouter from "./routes/UserRoutes.js";
import connectDB from "./db/connect.js";
import dotenv from 'dotenv';

const app = express();

dotenv.config();

const PORT = process.env.PORT;

// Middleware to parse JSON bodies
app.use(bodyParser.json(), userRouter);

connectDB().then(() => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT-SECRET not specified');
    }
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});