import React, { useState, useRef } from 'react';
import { AiOutlineFileImage } from "react-icons/ai";

const ImageUploader = ({ onImageUpload }) => {
    const [previewSrc, setPreviewSrc] = useState(null);
    const inputRef = useRef();

    const handleDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('border-indigo-600');
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('border-indigo-600');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('border-indigo-600');
        const file = e.dataTransfer.files[0];
        if (file) {
            displayPreview(file);
            onImageUpload?.(file);
        }
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            displayPreview(file);
            onImageUpload?.(file);
        }
    };

    const displayPreview = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewSrc(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div
            className="w-full relative border border-white/20 rounded-lg p-6"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <input
                type="file"
                ref={inputRef}
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
            />
            <div className="text-center pointer-events-none">
                <AiOutlineFileImage className="mx-auto h-12 w-12 text-white" aria-label="Upload icon" />
                <h3 className="mt-2 text-sm font-medium text-white">
                    <span>Drag and drop</span>
                    <span className="text-[#EE6C4D]"> or browse </span>
                    <span>to upload</span>
                </h3>
                <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>

            {previewSrc && (
                <img
                    src={previewSrc}
                    alt="Preview"
                    className="mt-4 mx-auto max-h-40 rounded"
                />
            )}
        </div>
    );
};

export default ImageUploader;
