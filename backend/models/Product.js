import mongoose from "mongoose";
import Review from "./Review";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
        required: true
    },
    reviews: {
        type: [Review],
        required: true
    },
    size: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductSize'
    }
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;