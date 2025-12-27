import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5002;

const startServer = async () => {
  try {
    await connectDB(); // 
      app.listen(PORT, () => {
      console.log(` DB connected`);
      console.log(` Server running on port ${PORT}`);
      console.log(` http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error(" Failed to start server:", error.message);
  }
};

startServer();
