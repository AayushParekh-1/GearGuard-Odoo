import mongoose from "mongoose";
import Team from "../models/teamModel.js";
import User from "../models/userModel.js";

export const createTeam = async (req, res) => {
  try {
    const { teamName } = req.body;

    if (!teamName)
      return res.status(400).json({ message: "teamName is required" });

    const exists = await Team.findOne({ name: teamName });

    if (exists) return res.status(409).json({ message: "Team already exists" });

    const team = await Team.create({
      name: teamName,
      members: [],
    });

    return res.status(201).json({
      message: "Team created successfully",
      team,
    });
  } catch (err) {
    res.status(500).json({ msg: "Failed to create team", error: err.message });
  }
};

export const addMemberToTeam = async (req, res) => {
  try {
    const { teamId, userId } = req.body;

    if (!teamId || !userId) {
      return res
        .status(400)
        .json({ message: "teamId and userId are required" });
    }

    if (
      !mongoose.Types.ObjectId.isValid(teamId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({ message: "Invalid IDs" });
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent duplicate
    if (team.members.includes(userId)) {
      return res.status(409).json({ message: "User already in team" });
    }

    team.members.push(userId);
    await team.save();

    return res.status(200).json({
      message: "Member added to team",
      team,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to add member",
      error: err.message,
    });
  }
};
