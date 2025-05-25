import express from "express";
import {getMaterials, getMaterial, createMaterial, updateMaterial} from "../controllers/material-controller.js";
import { validateRequest } from "../middlewares/request-validation.js";
import {materialCreatorValidator, updateMaterialValidator} from "../middlewares/Express-validator/material-validator.js";
import {currentUser} from "../middlewares/current-user.js";
import {requireAuth} from "../middlewares/require-auth.js";
import {requireAdmin} from "../middlewares/require-admin.js";

const material_router = express.Router();

material_router.get("/materials", getMaterials);
material_router.get("/material/:materialId", getMaterial);
material_router.post("/material",currentUser, requireAuth, requireAdmin, materialCreatorValidator, validateRequest, createMaterial);
material_router.put("/material/:materialId",currentUser, requireAuth, requireAdmin, updateMaterialValidator, validateRequest, updateMaterial);

export default material_router;
