import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        throw new Error('Failed to connect to MongoDB: ' + error.message);
    }
};

export default connectDB;