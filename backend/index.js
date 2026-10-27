import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import connectCloudinary from "./config/cloudinary.js";

dotenv.config();
mongoDb();
connectCloudinary();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));
const PORT = process.env.PORT || 5000;
// Define your routes here
app.get("/", (req, res) => {
  res.send("Hello From Server");
});

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
