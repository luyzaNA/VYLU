import {checkDuplicateMaterialName, createNewMaterial, fetchAllMaterials, fetchMaterialById, updateMaterialById} from "../services/material-service.js";
import { BadRequestError } from "../errors/bad-request.js";
import {ForbiddenError} from "../errors/forbidden-error.js";
import {DuplicateEntryError} from "../errors/duplicate-entry.js";

export const createMaterial = async (req, res, next) => {
    try {
        const user = req.currentUser;
        if (!user)
            throw new BadRequestError("User not authenticated");
        if (user.role !== "admin")
            throw new ForbiddenError("Only admins can create materials");

        const existing = await checkDuplicateMaterialName(req.body.materialName);
        if (existing) {
            throw new DuplicateEntryError(`Material with name "${req.body.materialName}" already exists.`);
        }

        const material = await createNewMaterial(req.body);
        res.status(201).json(material);
    } catch (err) {
        next(err);
    }
};

export const getMaterials = async (req, res, next) => {
    try {
        const materials = await fetchAllMaterials();
        res.status(200).json(materials);
    } catch (err) {
        next(err);
    }
};

export const getMaterial = async (req, res, next) => {
    try {
        const { materialId } = req.params;
        const material = await fetchMaterialById(materialId);
        if (!material)
            throw new BadRequestError("Material not found");

        res.status(200).json(material);
    } catch (err) {
        next(err);
    }
};

export const updateMaterial = async (req, res, next) => {
    try {
        const user = req.currentUser;
        if (!user)
            throw new BadRequestError("User not authenticated");
        if (user.role !== "admin")
            throw new ForbiddenError("Only admins can update materials");

        const { materialId } = req.params;
        const { materialName, ...otherFields } = req.body;

        const existingMaterial = await fetchMaterialById(materialId);
        if (!existingMaterial)
            throw new BadRequestError("Material not found");

        if (materialName && materialName !== existingMaterial.materialName) {
            const duplicate = await checkDuplicateMaterialName(materialName);
            if (duplicate) {
                throw new DuplicateEntryError(`Material with name "${materialName}" already exists.`);
            }
        }

        const updated = await updateMaterialById(materialId, {
            ...(materialName && { materialName }),
            ...otherFields,
        });

        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};