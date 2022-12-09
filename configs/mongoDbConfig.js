import mongoose from "mongoose";
import 'dotenv/config';

export const connectDb = async (uri) => {
    mongoose.set('strictQuery', true)
    const db = await mongoose.connect(uri);
    return db;
}