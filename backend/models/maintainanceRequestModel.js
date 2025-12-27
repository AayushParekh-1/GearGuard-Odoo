import mongoose from "mongoose";

const maintenanceRequestSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      trim: true,
      required: true
    },

    createdBy: {
      type: String,
      required: true,
      trim: true,
    },

    maintenanceFor: {
      type: String,
      enum: ["EQUIPMENT", "WORKCENTER"],
      required: true,
    },

    equipmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
      default: null,
    },

    // equipmentName: {
    //   type: String,
    //   trim: true,
    //   default: "",
    // },

    // equipmentSerialNo: {
    //   type: String,
    //   trim: true,
    //   default: "",
    // },

    // categoryName: {
    //   type: String,
    //   trim: true,
    //   default: "",
    // },

    // responsibleEmployeeName: {
    //   type: String,
    //   trim: true,
    //   default: "",
    // },

    workCenterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkCenter",
      default: null,
    },

    // workCenterName: {
    //   type: String,
    //   trim: true,
    //   default: "",
    // },

    requestDate: {
      type: Date,
      default: Date.now,
    },

    maintenanceType: {
      type: String,
      enum: ["CORRECTIVE", "PREVENTIVE"],
      required: true,
    },

    maintenanceTeamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    // maintenanceTeamName: {
    //   type: String,
    //   trim: true,
    //   default: "",
    // },

    technicianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // technicianName: {
    //   type: String,
    //   trim: true,
    //   default: "",
    // },

    scheduledDate: {
      type: Date,
      default: null,
    },

    durationHours: {
      type: Number,
      default: 0,
    },

    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "MEDIUM",
    },

    // companyName: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },

    // departmentName: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },

    preventive: {
      pattern: {
        type: String,
        enum: ["DAILY_INTERVAL", "WEEKLY_DAY", "MONTHLY_DATE"],
        default: null,
      },

      interval: {
        type: Number,
        default: null,
      },
    },

    status: {
      type: String,
      enum: ["NEW", "IN_PROGRESS", "REPAIRED", "SCRAPPED"],
      default: "NEW",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "MaintenanceRequest",
  maintenanceRequestSchema
);
