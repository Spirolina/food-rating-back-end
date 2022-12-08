import mongoose from "mongoose";
import 'dotenv/config';

export const connectDb = async () => {
    mongoose.set('strictQuery', true)
    const db = await mongoose.connect(process.env.MONGODB_URI);
    return db;
}