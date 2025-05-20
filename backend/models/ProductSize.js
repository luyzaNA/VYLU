import mongoose from "mongoose";

const ProductSizeSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['dress', 't-shirt', 'outerwear', 'coat', 'skirt', 'pants/jeans', 'bodysuit'],
        required: true
    },
    label: {
        type: String,
        enum: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
        required: true
    },
    values: {
        type: Map,
        of: Number,
        required: true,
    }
});

ProductSizeSchema.index({ type: 1, label: 1 }, { unique: true });

const ProductSize = mongoose.model('ProductSize', ProductSizeSchema);

export default ProductSize;