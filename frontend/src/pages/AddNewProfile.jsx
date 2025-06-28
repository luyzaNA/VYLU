import React, { useState } from "react";
import ImageUploader from "../components/UploadFile.jsx";
import ProfilePreview from "../components/Profile.jsx";
import TextButton from "../components/Button.jsx";
import {createUserProfile} from "../services/profileService.js";

const AddProfilePage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [editable, setEditable] = useState(false);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    const [formData, setFormData] = useState({
        fullName: "",
        age: "",
        image: null,
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

    const handleImageUpload = (file) => {
        setFormData((prev) => ({ ...prev, image: file }));
        setImagePreviewUrl(URL.createObjectURL(file));
    };
    const [touched, setTouched] = useState({});

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFormData((prev) => ({ ...prev, [id]: checked }));
        } else if (type === "select-multiple") {
            const options = [...e.target.selectedOptions].map((opt) => opt.value);
            setFormData((prev) => ({ ...prev, [id]: options }));
        } else {
            setFormData((prev) => ({ ...prev, [id]: value }));
        }
    };

    const handleBlur = (e) => {
        const { id } = e.target;
        setTouched((prev) => ({ ...prev, [id]: true }));
    };

    const validate = () => {
        const errors = {};

        if (
            !formData.fullName ||
            formData.fullName.trim().length < 2 ||
            formData.fullName.trim().length > 100
        ) {
            errors.fullName = "Name must be between 2 and 100 characters";
        }

        const age = parseInt(formData.age, 10);
        if (!age || age < 1 || age > 120) {
            errors.age = "Age must be a number between 1 and 120";
        }

        const bm = formData;

        if (!bm.heightCm || bm.heightCm < 50 || bm.heightCm > 300)
            errors.heightCm = "Height must be between 50 and 300";

        if (!bm.chestCm || bm.chestCm < 30 || bm.chestCm > 200)
            errors.chestCm = "Chest must be between 30 and 200";

        if (!bm.waistCm || bm.waistCm < 30 || bm.waistCm > 150)
            errors.waistCm = "Waist must be between 30 and 150";

        if (!bm.hipsCm || bm.hipsCm < 40 || bm.hipsCm > 200)
            errors.hipsCm = "Hips must be between 40 and 200";

        if (!bm.shoulderWidthCm || bm.shoulderWidthCm < 30 || bm.shoulderWidthCm > 80)
            errors.shoulderWidthCm = "Shoulder Width must be between 30 and 80";

        if (!bm.armLengthCm || bm.armLengthCm < 30 || bm.armLengthCm > 100)
            errors.armLengthCm = "Arm Length must be between 30 and 100";

        if (!bm.inseamCm || bm.inseamCm < 50 || bm.inseamCm > 120)
            errors.inseamCm = "Inseam must be between 50 and 120";

        if (!bm.thighCm || bm.thighCm < 30 || bm.thighCm > 100)
            errors.thighCm = "Thigh must be between 30 and 100";

        if (!bm.kneeCm || bm.kneeCm < 20 || bm.kneeCm > 60)
            errors.kneeCm = "Knee must be between 20 and 60";

        if (!bm.calfCm || bm.calfCm < 20 || bm.calfCm > 60)
            errors.calfCm = "Calf must be between 20 and 60";

        if (!bm.neckCm || bm.neckCm < 25 || bm.neckCm > 50)
            errors.neckCm = "Neck must be between 25 and 50";

        if (!bm.torsoLengthCm || bm.torsoLengthCm < 40 || bm.torsoLengthCm > 100)
            errors.torsoLengthCm = "Torso Length must be between 40 and 100";

        return errors;
    };

    const errors = validate();

    const isStepValid = () => {
        if (currentStep === 1) {
            return !errors.fullName && !errors.age;
        }
        if (currentStep === 2) {
            const measurementKeys = [
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
            return measurementKeys.every((key) => !errors[key]);
        }
        return true;
    };

    const handleNext = () => {
        if (currentStep === 1) {
            setTouched((prev) => ({
                ...prev,
                fullName: true,
                age: true,
            }));
        } else if (currentStep === 2) {
            const measurementKeys = [
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
            setTouched((prev) => {
                const newTouched = { ...prev };
                measurementKeys.forEach((key) => {
                    newTouched[key] = true;
                });
                return newTouched;
            });
        }

        if (isStepValid()) setCurrentStep((s) => s + 1);
        else alert("Please fill all required fields correctly.");
    };

    const handlePrev = () => setCurrentStep((s) => s - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const imageUrl = typeof formData.image === 'string' ? formData.image : undefined;

        setTouched({
            fullName: true,
            age: true,
            profilePicture: imageUrl,

            heightCm: true,
            chestCm: true,
            waistCm: true,
            hipsCm: true,
            shoulderWidthCm: true,
            armLengthCm: true,
            inseamCm: true,
            thighCm: true,
            kneeCm: true,
            calfCm: true,
            neckCm: true,
            torsoLengthCm: true,
        });

        if (Object.keys(errors).length === 0) {
            try {
                const result = await createUserProfile(formData);
                console.log(formData.image)
                console.log("Profile creat cu succes:", result);
                alert("Profil creat cu succes!");
            } catch (error) {
                console.error("Eroare la creare profil:", error);
                alert("A apărut o eroare la crearea profilului.");
            }
        } else {
            alert("Te rog să corectezi erorile înainte de trimitere.");
        }

    };

    return (
        <div className="relative w-full min-h-[calc(100vh-64px-48px)] flex flex-col items-center justify-center text-center px-4">
            <img
                src="https://thumb.r2.moele.me/t/34161/34151502/a-0076.jpg"
                className="absolute inset-0 w-full h-full object-cover z-0"
                alt="Background"
            />

            <div className="absolute inset-0 bg-white opacity-80  z-10"></div>
            <div className="bg-[#1F3134] shadow-lg shadow-black rounded-lg p-6 md:p-10 max-w-3xl justify-center w-1/2 z-20 relative">
                <div className="flex justify-between mb-4">
                    {["Personal Info", "Body measurements", "Preview"].map((label, idx) => (
                        <span
                            key={label}
                            className={`text-xs font-semibold py-1 px-2 uppercase rounded-full text-[#1F3134] bg-[#EE6C4D] ${
                                currentStep >= idx + 1 ? "" : "bg-transparent text-[#EE6C4D]"
                            }`}
                        >
              {label}
            </span>
                    ))}
                </div>
                <div className="overflow-hidden h-1 mb-4 rounded bg-[rgba(238,108,77,0.2)]">
                    <div
                        className="bg-[#EE6C4D] h-1 transition-all duration-500 ease-in-out"
                        style={{ width: `${(currentStep / 3) * 100}%` }}
                    ></div>
                </div>

                <form onSubmit={handleSubmit}>
                    {currentStep === 1 && (
                        <div className="flex flex-col items-center justify-center text-center mt-10 space-y-6">
                            <div className="w-1/2 text-left">
                                <label htmlFor="fullName" className="block text-white mb-1 font-medium">
                                    Full Name
                                </label>
                                <input
                                    id="fullName"
                                    type="text"
                                    placeholder="Name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full p-3 rounded border bg-[#1F3134] border-white/10 text-white focus:outline-none ${
                                        touched.fullName && errors.fullName ? "border-red-500" : ""
                                    }`}
                                    required
                                />
                                {touched.fullName && errors.fullName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                                )}
                            </div>

                            <div className="w-1/2 text-left">
                                <label htmlFor="age" className="block text-white mb-1 font-medium">
                                    Age
                                </label>
                                <input
                                    id="age"
                                    type="tel"
                                    placeholder="Age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full p-3 rounded border bg-[#1F3134] border-white/10 text-white focus:outline-none ${
                                        touched.age && errors.age ? "border-red-500" : ""
                                    }`}
                                    required
                                />
                                {touched.age && errors.age && (
                                    <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                                )}
                            </div>

                            <div className="w-1/2 text-left">
                                <label className="block text-white mb-2 font-medium">Upload Image</label>
                                <div className="min-h-1/3 w-full flex items-center justify-center bg-[#1F3134] text-white">
                                    <ImageUploader onImageUpload={handleImageUpload} />
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10 mx-20">
                            {[
                                { id: "heightCm", label: "Height" },
                                { id: "chestCm", label: "Chest" },
                                { id: "waistCm", label: "Waist" },
                                { id: "hipsCm", label: "Hips" },
                                { id: "shoulderWidthCm", label: "Shoulder Width" },
                                { id: "armLengthCm", label: "Arm Length" },
                                { id: "inseamCm", label: "Inseam" },
                                { id: "thighCm", label: "Thigh" },
                                { id: "kneeCm", label: "Knee" },
                                { id: "calfCm", label: "Calf" },
                                { id: "neckCm", label: "Neck" },
                                { id: "torsoLengthCm", label: "Torso Length" },
                            ].map(({ id, label }) => (
                                <div key={id} className="flex flex-col">
                                    <label htmlFor={id} className="text-left text-white mb-1 font-medium">
                                        {label}
                                    </label>
                                    <input
                                        id={id}
                                        type="number"
                                        placeholder="cm"
                                        value={formData[id] || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`w-full p-3 rounded border border-white/10 bg-[#1F3134] text-white focus:outline-none ${
                                            touched[id] && errors[id] ? "border-red-500" : ""
                                        }`}
                                        required
                                    />
                                    {touched[id] && errors[id] && (
                                        <p className="text-red-500 text-sm mt-1">{errors[id]}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div>
                            <ProfilePreview
                                formData={formData}
                                editable={editable}
                                onChange={handleChange}
                                imagePreviewUrl={imagePreviewUrl}
                            />
                        </div>
                    )}

                    <div className="flex justify-between mt-8">
                        <div>
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    className="bg-gray-300 text-[#1F3134] px-6 py-2 rounded border-none cursor-pointer hover:bg-gray-400 transition"
                                >
                                    Prev
                                </button>
                            )}
                        </div>

                        <div>
                            {currentStep < 3 && (
                                <TextButton
                                    type="button"
                                    onClick={handleNext}
                                    disabled={!isStepValid()}
                                    className={`px-6 py-2 border-none rounded text-white ${
                                        isStepValid() ? "bg-[#EE6C4D] hover:bg-[#dd5736]" : "bg-gray-400 cursor-not-allowed"
                                    }`}
                                >
                                    Next
                                </TextButton>
                            )}

                            {currentStep === 3 && (
                                <TextButton
                                    type="submit"
                                    className="px-6 py-2 border-none bg-[#EE6C4D] rounded text-white hover:bg-[#dd5736]"
                                >
                                    Submit
                                </TextButton>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProfilePage;
