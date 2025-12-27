import express from "express";
import {
  register,
  login,
  logout,
  getMe,
} from "../controllers/auth_controller.js";
import { protect } from "../middleware/auth_middleware.js";

const router = express.Router();

/* AUTH ROUTES */
router.post("/register", register); // later restrict to ADMIN
router.post("/login", login);
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);

export default router;
