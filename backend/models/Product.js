import mongoose from "mongoose";
import Review from "./Review";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [100, "Name cannot exceed 100 characters"]
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price must be a positive number"]
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: [10, "Description must be at least 10 characters long"]
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
    },
    material: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MaterialSchema'
    }
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;