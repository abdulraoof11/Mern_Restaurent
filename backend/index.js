import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
mongoDb();

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
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
