import mongoose from 'mongoose';
import { MongoDB_URI } from './config.js'

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(MongoDB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};
