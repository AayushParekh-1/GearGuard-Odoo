import EquipmentCategory from "../models/equipmentCategoryModel.js";

// CREATE equipment category
export const createEquipmentCategory = async (req, res) => {
  try {
    const { name, companyName, teamId } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const exists = await EquipmentCategory.findOne({ name });
    if (exists) {
      return res.status(409).json({ message: "Equipment category already exists" });
    }

    const category = await EquipmentCategory.create({
      name,
      companyName: companyName || "My Company",
      teamId: teamId || null,
    });

    return res.status(201).json({
      message: "Equipment category created successfully",
      category,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to create equipment category",
      error: err.message,
    });
  }
};

// GET all equipment categories
export const getAllEquipmentCategories = async (req, res) => {
  try {
    const categories = await EquipmentCategory.find()
      .populate("teamId", "name")
      .sort({ name: 1 });

    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch equipment categories",
      error: err.message,
    });
  }
};

// GET equipment category by ID
export const getEquipmentCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await EquipmentCategory.findById(id).populate("teamId", "name");
    if (!category) {
      return res.status(404).json({ message: "Equipment category not found" });
    }

    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch equipment category",
      error: err.message,
    });
  }
};

