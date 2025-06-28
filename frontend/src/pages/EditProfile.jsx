import React, { useState } from "react";
import ProfilePreview from "../components/Profile.jsx";

export default function EditProfilePage() {

    const [formData, setFormData] = useState({
        fullName: "",
        age: "",
        heightCm: "",
        chestCm: "",
        waistCm: "",
        hipsCm: "",
        shoulderWidthCm: "",
        armLengthCm: "",
        inseamCm: "",
        thighCm: "",
        kneeCm: "",
        calfCm: "",
        neckCm: "",
        torsoLengthCm: "",
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSave = async () => {
        const payload = new FormData();
        payload.append("fullName", formData.fullName);
        payload.append("age", formData.age);

        if (imageFile) {
            payload.append("profilePicture", imageFile);
        }

        const measurements = [
            "heightCm",
            "chestCm",
            "waistCm",
            "hipsCm",
            "shoulderWidthCm",
            "armLengthCm",
            "inseamCm",
            "thighCm",
            "kneeCm",
            "calfCm",
            "neckCm",
            "torsoLengthCm",
        ];

        measurements.forEach((key) => {
            payload.append(`bodyMeasurements[${key}]`, formData[key]);
        });

        try {
            const response = await fetch("/api/profile", {
                method: "POST",
                body: payload,
            });

            if (!response.ok) throw new Error("Failed to save profile");

            alert("Profile saved successfully!");
        } catch (error) {
            alert("Error saving profile: " + error.message);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center text-white">Edit Profile</h1>



            <ProfilePreview
                formData={formData}
                editable={true}
                onChange={handleInputChange}
                imagePreviewUrl={imagePreviewUrl}
            />

            <div className="mt-6 text-center">
                <button
                    onClick={handleSave}
                    className="bg-[#EE6C4D] hover:bg-[#d65935] text-white px-6 py-3 rounded font-semibold transition"
                >
                    Save Profile
                </button>
            </div>
        </div>
    );
};

