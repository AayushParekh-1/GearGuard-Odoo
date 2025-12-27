import MaintainanceRequest from "../models/maintainanceRequestModel.js";
import Equipment from "../models/equipmentModel.js";

export const createRequest = async (req, res) => {
  try {
    const { equipmentId, type, subject, scheduledDate } = req.body;

    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    if (equipment.isScrapped) {
      return res.status(400).json({ message: "Equipment is scrapped" });
    }

    if (type === "PREVENTIVE" && !scheduledDate) {
      return res.status(400).json({
        message: "Scheduled date required for preventive maintenance",
      });
    }

    const request = await MaintainanceRequest.create({
      subject,
      maintenanceType: type, // Map 'type' from body to 'maintenanceType' in model
      maintenanceFor: "EQUIPMENT", // Explicitly set for this equipment-centric flow
      equipmentId: equipmentId,
      maintenanceTeamId: equipment.maintenanceTeamId, // AUTO assignment
      scheduledDate,
      createdBy: req.user._id,
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await MaintainanceRequest.findById(id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Only manager/admin can scrap
    if (status === "SCRAP" && req.user.role === "TECHNICIAN") {
      return res.status(403).json({ message: "Not allowed" });
    }

    request.status = status;
    await request.save();

    // Scrap logic
    if (status === "SCRAP") {
      await Equipment.findByIdAndUpdate(request.equipment, {
        isScrapped: true,
      });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllRequests = async (req, res) => {
  try {
    const requests = await MaintainanceRequest.find()
      .populate("equipmentId", "name serialNumber")
      .populate("maintenanceTeamId", "name")
      .populate("technicianId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await MaintainanceRequest.findById(id)
      .populate("equipmentId", "name serialNumber")
      .populate("maintenanceTeamId", "name")
      .populate("technicianId", "name");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
