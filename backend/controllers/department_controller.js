import Department from "../models/departmentModel.js";

// create department
export const createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Department name is required" });
    }

    const exists = await Department.findOne({ name });
    if (exists) {
      return res.status(409).json({ message: "Department already exists" });
    }

    const department = await Department.create({
      name,
      description: description || "",
    });

    return res.status(201).json({
      message: "Department created successfully",
      department,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Failed to create department",
      error: err.message,
    });
  }
};

// GET all departments
export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ name: 1 });

    return res.status(200).json(departments);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch departments",
      error: err.message,
    });
  }
};

// GET department by ID
export const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    return res.status(200).json(department);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch department",
      error: err.message,
    });
  }
};
