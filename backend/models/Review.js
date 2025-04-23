import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    photos: {
        type: [String],
        required: false
    },
    userName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Review = mongoose.model('Review', ReviewSchema);

export default Review;