import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
      required: true, // bcrypt hash
    },

    role: {
      type: String,
      enum: ["ADMIN", "MANAGER", "TECHNICIAN", "EMPLOYEE"],
      required: true,
    },

    department: {
      type: String,
      required: false
    },

    avatar : {
      type : String,
      default : "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png",
      required: false
    },
    status: {
      type: String,
      enum: ["Pending", "Active", "Disabled"],
      default: "Pending",
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      default: null,
      required : false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
