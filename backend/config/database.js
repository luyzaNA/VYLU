import mongoose from 'mongoose';
import {DatabaseConnectionError} from "../errors/database-connection.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        throw new DatabaseConnectionError();
    }
};
