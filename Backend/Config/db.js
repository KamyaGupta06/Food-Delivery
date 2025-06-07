import mongoose from "mongoose";

export const connectDB=async()=>{
    try {
        await mongoose.connect('mongodb+srv://guptakamya95:8817@cluster0.yn7uemj.mongodb.net/Food-Del', {
        });
        console.log("DB connected");
    } catch (error) {
        console.error("DB connection failed:", error.message);
        process.exit(1);
    }
}

