import mongoose from "mongoose";

const PriceSchema = new mongoose.Schema({
    original: {
        type: Number,
        required: true,
        min: [0, "Original price must be a positive number"]
    },
    sale: {
        type: Number,
        min: [0, "Sale price must be a positive number"]
    },
    onSale: {
        type: Boolean,
        default: false
    }
});

export default PriceSchema;
