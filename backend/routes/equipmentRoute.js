import express from "express";
import {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
  updateEquipment,
  scrapEquipment,
  getMaintenanceCountForEquipment,
  getMaintenanceRequestsForEquipment,
} from "../controllers/equipment_controller.js";
import { protect } from "../middleware/auth_middleware.js";

const router = express.Router();

router.post("/", protect, createEquipment);
router.get("/", protect, getAllEquipment);
router.get("/:id", protect, getEquipmentById);
router.put("/:id", protect, updateEquipment);
router.patch("/:id/scrap", protect, scrapEquipment);
router.get("/:id/maintenance/count", protect, getMaintenanceCountForEquipment);
router.get("/:id/maintenance", protect, getMaintenanceRequestsForEquipment);

export default router;
