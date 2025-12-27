import User from "../models/userModel.js";

// Get all pending users
export const getPendingUsers = async (req, res) => {
  const users = await User.find({ status: "PENDING" }).select("-password");
  res.status(200).json(users);
};

// Assign department, team, avatar
export const assignUser = async (req, res) => {
  const { userId } = req.params;
  const { department, teamId, avatar } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.department = department;
  user.teamId = teamId;
  user.avatar = avatar;
  user.status = "ACTIVE";

  await user.save();

  res.status(200).json({
    message: "User assigned and activated",
    user,
  });
};
