import mongoose from "mongoose";

const MaterialSchema = new mongoose.Schema({
    materialName: {
        type: String,
        required: true,
    },
    materialComposition: {
        type: Map,
        of: Number,
        required: true,
    },
    elasticityLevel: {
        type: Number,
        min: 0.0,
        max: 1.0,
        required: true,
    }
});

const Material = mongoose.model('Material', MaterialSchema);

export default Material;