import Equipment from "../models/equipmentModel.js";
import MaintenanceRequest from "../models/maintainanceRequestModel.js";

/* CREATE equipment */
export const createEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.create(req.body);
    res.status(201).json(equipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* GET all equipment (list view) */
export const getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find()
      .populate("categoryId", "name")
      .populate("departmentId", "name")
      .populate("employeeId", "name")
      .populate("maintenanceTeamId", "name")
      .populate("technicianId", "name");

    res.json(equipment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET single equipment (form view) */
export const getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id)
      .populate("categoryId", "name")
      .populate("departmentId", "name")
      .populate("employeeId", "name")
      .populate("maintenanceTeamId", "name")
      .populate("technicianId", "name");

    if (!equipment)
      return res.status(404).json({ message: "Equipment not found" });

    res.json(equipment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE equipment */
export const updateEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(equipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* SCRAP equipment */
export const scrapEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      {
        isScrapped: true,
        scrapDate: new Date(),
      },
      { new: true }
    );

    res.json(equipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getMaintenanceCountForEquipment = async (req, res) => {
  try {
    const { id } = req.params;

    const count = await MaintenanceRequest.countDocuments({
      equipmentId: id,
      status: { $in: ["NEW", "IN_PROGRESS"] },
    });

    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getMaintenanceRequestsForEquipment = async (req, res) => {
  try {
    const { id } = req.params;

    const requests = await MaintenanceRequest.find({
      equipmentId: id,
    })
      .populate("maintenanceTeamId", "name")
      .populate("technicianId", "name")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
