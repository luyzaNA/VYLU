import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating cannot be more than 5"]
    },
    description: {
        type: String,
        required: false,
        maxlength: [1000, "Description cannot exceed 1000 characters"]
    },
    photos: {
        type: [String],
        required: false
    },
    userName: {
        type: String,
        required: true,
        minlength: [3, "User name must be at least 3 characters long"],
        maxlength: [50, "User name cannot exceed 50 characters"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    }
});

export default ReviewSchema;
