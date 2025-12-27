import express from "express";
import {
  createTeam,
  addMemberToTeam,
} from "../controllers/teamController.js";

const router = express.Router();

// Create new team
router.post("/", createTeam);

// Add member to team
router.post("/add-member", addMemberToTeam);

export default router;
