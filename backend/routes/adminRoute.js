import express from "express";
import { protect, authorizeRoles } from "../middleware/auth_middleware.js";
import { getPendingUsers, assignUser } from "../controllers/admin_controller.js";

const router = express.Router();

router.get(
  "/users/pending",
  protect,
  authorizeRoles("ADMIN"),
  getPendingUsers
);

router.patch(
  "/users/:userId/assign",
  protect,
  authorizeRoles("ADMIN"),
  assignUser
);

export default router;
