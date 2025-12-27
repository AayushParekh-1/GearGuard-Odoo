import express from "express";
import {
  createWorkCenter,
  getAllWorkCenters,
  getWorkCenterById,
} from "../controllers/workcenter_controller.js";
import { protect } from "../middleware/auth_middleware.js";

const router = express.Router();

// Create work center
router.post("/", protect, createWorkCenter);

// Get all work centers
router.get("/", protect, getAllWorkCenters);

// Get work center by ID
router.get("/:id", protect, getWorkCenterById);

export default router;
