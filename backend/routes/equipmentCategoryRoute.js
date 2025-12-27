import express from "express";
import {
  createEquipmentCategory,
  getAllEquipmentCategories,
  getEquipmentCategoryById,
} from "../controllers/equipmentCategory_controller.js";
import { protect } from "../middleware/auth_middleware.js";

const router = express.Router();

// Create equipment category
router.post("/", protect, createEquipmentCategory);

// Get all equipment categories
router.get("/", getAllEquipmentCategories);

// Get equipment category by ID
router.get("/:id", getEquipmentCategoryById);

export default router;

