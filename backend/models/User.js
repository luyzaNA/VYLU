import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password must be at least 8 characters long"]
    },
    role: {
        type: String,
        enum: ['client', 'admin'],
        required: true,
        default: 'client'
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "User name must be at least 3 characters long"],
        maxlength: [50, "User name cannot exceed 50 characters"],
    },
    profiles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        default: []
    }],
    userPicture: {
        type: String,
        default: "https://vylum.s3.eu-central-1.amazonaws.com/user-solid.svg"
    },
});

const User = mongoose.model('User', UserSchema);

export default User;