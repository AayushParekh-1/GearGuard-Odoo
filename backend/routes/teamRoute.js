import express from "express";
import {
  createTeam,
  addMemberToTeam,
  getAllTeams,
} from "../controllers/team_controller.js";
import { protect } from "../middleware/auth_middleware.js";

const router = express.Router();

// Create new team
router.post("/", protect, createTeam);

// Add member to team
router.post("/add-member", protect, addMemberToTeam);

// get all teams
router.get("/", protect, getAllTeams);

export default router;
