import Profile from "../models/Profile.js";

export const createProfile = async (profileData) => {
    const profile = new Profile(profileData);
    return await profile.save();
};

export const updateProfile = async (profileId, updateData) => {
    return await Profile.findByIdAndUpdate(profileId, updateData, { new: true, runValidators: true });
};

export const deleteProfile = async (profileId) => {
    return await Profile.findByIdAndDelete(profileId);
};

export const getProfileById = async (id) => {
    return Profile.findById(id);
};