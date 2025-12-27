import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    serialNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EquipmentCategory",
      required: true,
    },

    // categoryName: {
    //   type: String,
    //   trim: true,
    //   default: "",
    // },

    // companyName: {
    //   type: String,
    //   required: true,
    //   default: "My Company",
    //   trim: true,
    // },

    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    // departmentName: {
    //   type: String,
    //   trim: true,
    //   default: "",
    // },

    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // employeeName: {
    //   type: String,
    //   trim: true,
    //   default: "",
    // },


    assignedDate: {
      type: Date,
      default: null,
    },

    isScarpped: {
      type: Boolean,
      default: false
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

    // workCenterName: {
    //   type: String,
    //   trim: true,
    //   default: ""
    // },

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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Equipment", equipmentSchema);
