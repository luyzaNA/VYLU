import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, "Name must be at least 2 characters"],
        maxlength: [100, "Name cannot exceed 100 characters"]
    },
    age: {
        type: Number,
        required: true,
        min: [1, "Age must be at least 1"],
        max: [120, "Age must be realistic"]
    },
    profilePicture: {
        type: String,
        default: "https://vylum.s3.eu-central-1.amazonaws.com/icon-7797704_640.png"
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    bodyMeasurements: {
        heightCm: {
            type: Number,
            required: true,
            min: [50, "Height must be at least 50 cm"],
            max: [300, "Height cannot exceed 300 cm"]
        },
        chestCm: {
            type: Number,
            required: true,
            min: [30, "Chest must be at least 30 cm"],
            max: [200, "Chest cannot exceed 200 cm"]
        },
        waistCm: {
            type: Number,
            required: true,
            min: [30, "Waist must be at least 30 cm"],
            max: [150, "Waist cannot exceed 150 cm"]
        },
        hipsCm:  {
            type: Number,
            required: true,
            min: [40, "Hips must be at least 40 cm"],
            max: [200, "Hips cannot exceed 200 cm"]
        },
        shoulderWidthCm: {
            type: Number,
            required: true,
            min: [30, "Shoulder width must be at least 30 cm"],
            max: [80, "Shoulder width cannot exceed 80 cm"]
        },
        armLengthCm: {
            type: Number,
            required: true,
            min: [30, "Arm length must be at least 30 cm"],
            max: [100, "Arm length cannot exceed 100 cm"]
        },
        inseamCm: {
            type: Number,
            required: true,
            min: [50, "Inseam must be at least 50 cm"],
            max: [120, "Inseam cannot exceed 120 cm"]
        },
        thighCm: {
            type: Number,
            required: true,
            min: [30, "Thigh must be at least 30 cm"],
            max: [100, "Thigh cannot exceed 100 cm"]
        },
        kneeCm: {
            type: Number,
            required: true,
            min: [20, "Knee must be at least 20 cm"],
            max: [60, "Knee cannot exceed 60 cm"]
        },
        calfCm: {
            type: Number,
            required: true,
            min: [20, "Calf must be at least 20 cm"],
            max: [60, "Calf cannot exceed 60 cm"]
        },
        neckCm: {
            type: Number,
            required: true,
            min: [25, "Neck must be at least 25 cm"],
            max: [50, "Neck cannot exceed 50 cm"]
        },
        torsoLengthCm: {
            type: Number,
            required: true,
            min: [40, "Torso length must be at least 40 cm"],
            max: [100, "Torso length cannot exceed 100 cm"]
        }
    },
});

const Profile = mongoose.model('Profile', ProfileSchema);

export default Profile;