import React from "react";

const ProfilePreview = ({ formData, editable, onChange, imagePreviewUrl, onImageChange }) => {
    const measurements = [
        { id: "heightCm", label: "Height (cm)" },
        { id: "chestCm", label: "Chest (cm)" },
        { id: "waistCm", label: "Waist (cm)" },
        { id: "hipsCm", label: "Hips (cm)" },
        { id: "shoulderWidthCm", label: "Shoulder Width (cm)" },
        { id: "armLengthCm", label: "Arm Length (cm)" },
        { id: "inseamCm", label: "Inseam (cm)" },
        { id: "thighCm", label: "Thigh (cm)" },
        { id: "kneeCm", label: "Knee (cm)" },
        { id: "calfCm", label: "Calf (cm)" },
        { id: "neckCm", label: "Neck (cm)" },
        { id: "torsoLengthCm", label: "Torso Length (cm)" },
    ];

    const fallbackImage = "https://vylum.s3.eu-central-1.amazonaws.com/icon-7797704_640.png";

    return (
        <div className="profile-preview bg-[#1F3134] p-4 rounded-lg max-w-3xl mx-auto text-white shadow-lg">
            {/* Top section: Name & Age on left, Photo on right */}
            {/* Top section: Name & Age on left, Photo on right */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    {editable ? (
                        <>
                            <input
                                id="fullName"
                                type="text"
                                value={formData.fullName || ""}
                                onChange={onChange}
                                placeholder="Full Name"
                                className="text-2xl font-bold bg-[#1F3134] text-white border border-white/10 p-1 rounded mb-2 w-full"
                            />
                            <input
                                id="age"
                                type="number"
                                value={formData.age || ""}
                                onChange={onChange}
                                placeholder="Age"
                                className="text-lg bg-[#1F3134] text-white border border-white/10 p-1 rounded w-full"
                            />
                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold">{formData.fullName || "No name"}</h2>
                            <p className="text-lg mt-1">
                                {formData.age ? `${formData.age} years old` : "No age"}
                            </p>
                        </>
                    )}
                </div>
                <div className="flex flex-col items-center">
                    <img
                        src={imagePreviewUrl || fallbackImage}
                        alt={`Profile picture of ${formData.fullName || "the user"}`}
                        className="w-24 h-24 rounded-full object-cover border-2 border-[#EE6C4D] mb-2"
                    />
                    {editable && (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onImageChange}
                            className="text-sm text-white"
                        />
                    )}
                </div>

            </div>


            {/* Measurements grid */}
            <div className="grid grid-cols-3 gap-6">
                {measurements.map(({ id, label }) => (
                    <div key={id} className="flex flex-col">
                        <label className="font-semibold mb-1 text-white/60">{label}:</label>
                        <input
                            id={id}
                            type="number"
                            value={formData[id] || ""}
                            onChange={onChange}
                            disabled={!editable}
                            className="p-2 rounded border border-white/10 bg-[#1F3134] text-white focus:outline-none text-center"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfilePreview;
