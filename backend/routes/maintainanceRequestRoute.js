import express from "express";
import { createRequest, getAllRequests, getRequestById } from "../controllers/maintainanceRequest_controller.js";
import { protect } from "../middleware/auth_middleware.js";

const router = express.Router();

router.post("/create", protect, createRequest);
router.get("/", protect, getAllRequests);
router.get("/:id", protect, getRequestById);

export default router;
