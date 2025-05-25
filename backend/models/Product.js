import mongoose from "mongoose";
import ReviewSchema from "./Review.js";
import PriceSchema from "./Price.js";
import {calculateTotalElasticity} from "../middlewares/elasticity-middleware.js";
import {generateSlug} from "../middlewares/slug-generator.js";
import {generateTags} from "../middlewares/tag-generator.js";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [100, "Name cannot exceed 100 characters"]
    },
    price: {
        type: PriceSchema,
        required: true
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
        type: [ReviewSchema],
        default: []
    },
    size: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductSize',
        required: true
    },
    customSizeOverride: {
        type: Map,
        of: Number,
        default: () => new Map()
    },
    materials: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material"
    }],
    totalElasticity: {
        type: Number,
        required: true,
        default: 0
    },
    gender: {
        type: String,
        enum: ["woman", "man"],
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: [0, "Stock cannot be negative"],
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    tags: {
        type: [String],
        default: []
    },
    color: {
        type: String,
        required: true,
        minlength: [3, "Color must be at least 3 characters long"]
    },
    relatedProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
});

ProductSchema.index({ gender: 1 });
ProductSchema.index({ tags: 1 });
ProductSchema.index({ 'price.original': 1, 'price.sale': 1 });
ProductSchema.index({ size: 1 });
ProductSchema.index({ color: 1 });
ProductSchema.index({ createdAt: 1 });

ProductSchema.pre('validate', function () {
    if (!this.slug) {
        this.slug = generateSlug(this.name);
    }
});

ProductSchema.pre('save', async function (next) {
    try {
        this.tags = generateTags(this);
        await calculateTotalElasticity.call(this);
        next();
    } catch (err) {
        next(err);
    }
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
