import mongoose from "mongoose";

const workCenterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Department",
    },

    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("WorkCenter", workCenterSchema);
