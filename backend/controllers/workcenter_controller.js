import mongoose from "mongoose";
import WorkCenter from "../models/workCenterModel.js";
import Department from "../models/departmentModel.js";

// CREATE work center
export const createWorkCenter = async (req, res) => {
  try {
    const { name, companyName, department, location } = req.body;

    if (!name || !companyName || !department || !location) {
      return res.status(400).json({
        message: "name, companyName, department and location are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(department)) {
      return res.status(400).json({ message: "Invalid department id" });
    }

    const dept = await Department.findById(department);
    if (!dept) {
      return res.status(404).json({ message: "Department not found" });
    }

    const exists = await WorkCenter.findOne({ name });
    if (exists) {
      return res.status(409).json({ message: "WorkCenter already exists" });
    }

    const workCenter = await WorkCenter.create({
      name,
      companyName,
      department,
      departmentName: dept.name,
      location,
    });

    return res.status(201).json({
      message: "WorkCenter created successfully",
      workCenter,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to create work center",
      error: err.message,
    });
  }
};

// GET all work centers
export const getAllWorkCenters = async (req, res) => {
  try {
    const workCenters = await WorkCenter.find().sort({ name: 1 });

    return res.status(200).json(workCenters);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch work centers",
      error: err.message,
    });
  }
};

// GET work center by ID
export const getWorkCenterById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid work center id" });
    }

    const workCenter = await WorkCenter.findById(id);
    if (!workCenter) {
      return res.status(404).json({ message: "WorkCenter not found" });
    }

    return res.status(200).json(workCenter);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch work center",
      error: err.message,
    });
  }
};
