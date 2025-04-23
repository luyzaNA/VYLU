import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    bodyMeasurements: {
        heightCm: {
            type: Number,
            required: true
        },
        chestCm: {
            type: Number,
            required: true
        },
        waistCm: {
            type: Number,
            required: true
        },
        hipsCm:  {
            type: Number,
            required: true
        },
        shoulderWidthCm: {
            type: Number,
            required: true
        },
        armLengthCm: {
            type: Number,
            required: true
        },
        inseamCm: {
            type: Number,
            required: true
        },
        thighCm: {
            type: Number,
            required: true
        },
        kneeCm: {
            type: Number,
            required: true
        },
        calfCm: {
            type: Number,
            required: true
        },
        neckCm: {
            type: Number,
            required: true
        },
        torsoLengthCm: {
            type: Number,
            required: true
        }
    },
});

const Profile = mongoose.model('Profile', ProfileSchema);

export default Profile;