import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        
        console.log("MongoDB Connected");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.error("Please check your MongoDB connection string and environment variables.");
        // need to learn
        process.exit(1);
    }
};
export default connectDB;