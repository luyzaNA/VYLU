import Material from "../models/Material.js";

export const createNewMaterial = async (materialData) => {
    const material = new Material(materialData);
    return await material.save();
};

export const fetchAllMaterials = async () => {
    return await Material.find().sort({ materialName: 1 });
};

export const fetchMaterialById = async (materialId) => {
    return await Material.findById(materialId);
};

export const updateMaterialById = async (id, updateData) => {
    return Material.findByIdAndUpdate(id, updateData, { new: true });
};

export const checkDuplicateMaterialName = async (materialName) => {
    return await Material.findOne({ materialName });
};
