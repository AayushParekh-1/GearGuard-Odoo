import express from "express";
import {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
}
    from "../controllers/department_controller.js";
import { protect } from "../middleware/auth_middleware.js";

const router = express.Router();

router.post("/", protect, createDepartment);

router.get("/", getAllDepartments);

router.get("/:id", getDepartmentById);

export default router;