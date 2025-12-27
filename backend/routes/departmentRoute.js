import express from "express";
import {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
}
from "../controllers/department_controller.js";

const router = express.Router();

router.post("/", createDepartment);

router.get("/", getDepartmentById);

router.get("/:id", getAllDepartments);

export default router;