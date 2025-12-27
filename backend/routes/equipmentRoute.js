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

const router = express.Router();

router.post("/", createEquipment);
router.get("/", getAllEquipment);
router.get("/:id", getEquipmentById);
router.put("/:id", updateEquipment);
router.patch("/:id/scrap", scrapEquipment);
router.get("/:id/maintenance/count",getMaintenanceCountForEquipment);
router.get("/:id/maintenance",getMaintenanceRequestsForEquipment);

export default router;
