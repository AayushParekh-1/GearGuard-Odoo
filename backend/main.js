import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import equipmentRoutes from "./routes/equipmentRoute.js"
import authRoutes from "./routes/authRoute.js";
import adminRoutes from "./routes/adminRoute.js"
import maintainanceRequestRoute from "./routes/maintainanceRequestRoute.js";
import departmentRoutes from "./routes/departmentRoute.js";
import teamRoutes from "./routes/teamRoute.js";
import workcenterRoutes from "./routes/workcenterRoute.js";
import equipmentCategoryRoutes from "./routes/equipmentCategoryRoute.js";
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
app.use("/api/admin", adminRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use("/api/requests", maintainanceRequestRoute);
app.use("/api/departments", departmentRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/workcenters", workcenterRoutes);
app.use("/api/equipment-categories", equipmentCategoryRoutes);


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
