import express from "express";
import {
  createWorkCenter,
  getAllWorkCenters,
  getWorkCenterById,
} from "../controllers/workCenterController.js";

const router = express.Router();

// Create work center
router.post("/", createWorkCenter);

// Get all work centers
router.get("/", getAllWorkCenters);

// Get work center by ID
router.get("/:id", getWorkCenterById);

export default router;
