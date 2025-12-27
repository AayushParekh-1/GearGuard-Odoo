import mongoose from "mongoose";

const equipmentCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    companyName: {
      type: String,
      default: "My Company",
      trim: true,
    },

    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      default: null,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("EquipmentCategory", equipmentCategorySchema);
