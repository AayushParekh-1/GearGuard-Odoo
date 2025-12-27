import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EquipmentCategory",
      required: true,
    },

    companyName: {
      type: String,
      required: true,
      default: "My Company",
      trim: true,
    },

    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    employeeName: {
      type: String,
      trim: true,
      default: "",
    },

    serialNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    assignedDate: {
      type: Date,
      default: null,
    },

    scrappedDate: {
      type: Date,
      default: null,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    workCenterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkCenter",
      required: true,
    },

    maintenanceTeamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    maintenanceTeamName: {
      type: String,
      trim: true,
      default: "",
    },

    technicianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    technicianName: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Equipment", equipmentSchema);
