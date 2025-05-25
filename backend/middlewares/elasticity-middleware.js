import Material from "../models/Material.js";

export const calculateTotalElasticity = async function () {
    if (!this.materials || this.materials.length === 0) {
        this.totalElasticity = 0;
        return;
    }

    const materials = await Material.find({
        _id: { $in: this.materials }
    }).select('elasticityLevel');

    if (!materials || materials.length === 0) {
        this.totalElasticity = 0;
        return;
    }

    const total = materials.reduce((sum, mat) => sum + (mat.elasticityLevel || 0), 0);
    const averageElasticity = total / materials.length;

    this.totalElasticity = averageElasticity;
};
