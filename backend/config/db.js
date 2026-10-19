import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.MONGODB_URI;
console.log(dbUrl)

const mongoDb = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("MongoDB connected successfully ✅");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default mongoDb;