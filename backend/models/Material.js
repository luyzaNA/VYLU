import mongoose from "mongoose";

const MaterialSchema = new mongoose.Schema({
    materialName: {
        type: String,
        required: true,
        minlength: [3, "Material name must be at least 3 characters long"],
        maxlength: [100, "Material name cannot exceed 100 characters"],
        unique: true
    },
    elasticityLevel: {
        type: Number,
        min: [0.0, "Elasticity level must be at least 0.0"],
        max: [1.0, "Elasticity level cannot exceed 1.0"],
        required: true
    }
});

const Material = mongoose.model("Material", MaterialSchema);

export default Material;
