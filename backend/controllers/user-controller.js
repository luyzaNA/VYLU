import {createProfile, updateProfile, deleteProfile, getProfileById,} from '../services/profile-service.js';
import {BadRequestError} from '../errors/bad-request.js';
import {findUserById, getUserWithProfiles} from '../services/user-service.js';
import {NotAuthorizedError} from "../errors/not-authorized.js";

export const createUserProfile = async (req, res, next) => {
    try {
        const userId = req.currentUser?.id;
        if (!userId)
            throw new BadRequestError("User not authenticated");

        const user = await findUserById(userId);
        if (!user)
            throw new BadRequestError("User not found");

        const profile = await createProfile(req.body);

        user.profiles.push(profile._id);
        await user.save();

        res.status(201).json(profile);
    } catch (err) {
        next(err);
    }
};

export const getUserProfiles = async (req, res, next) => {
    try {
        const userId = req.currentUser?.id;
        if (!userId)
            throw new BadRequestError("User not authenticated");

        const user = await getUserWithProfiles(userId);
        if (!user)
            throw new BadRequestError("User not found");

        res.status(200).json(user.profiles);
    } catch (err) {
        next(err);
    }
};

export const getUserProfile = async (req, res, next) => {
    try {
        const userId = req.currentUser?.id;
        const { profileId } = req.params;

        if (!userId) {
            throw new BadRequestError("User not authenticated");
        }
        if (!profileId) {
            throw new BadRequestError("Profile ID missing");
        }

        const user = await getUserWithProfiles(userId);
        if (!user) {
            throw new BadRequestError("User not found");
        }

        const profile = user.profiles.find(p => p._id.toString() === profileId);
        if (!profile) {
            throw new NotAuthorizedError("You do not have access to this profile");
        }

        res.status(200).json(profile);
    } catch (err) {
        next(err);
    }
};

export const updateUserProfile = async (req, res, next) => {
    try {
        const userId = req.currentUser?.id;
        const profileId = req.params.profileId;

        if (!userId)
            throw new BadRequestError("User not authenticated");

        const user = await findUserById(userId);
        if (!user)
            throw new BadRequestError("User not found");

        if (!user.profiles.includes(profileId))
            throw new NotAuthorizedError("You do not own this profile");

        const updatedProfile = await updateProfile(profileId, req.body);
        if (!updatedProfile)
            throw new BadRequestError("Profile not found");

        res.status(200).json(updatedProfile);
    } catch (err) {
        next(err);
    }
};

export const deleteProfileFromUser = async (req, res, next) => {
    try {
        const userId = req.currentUser?.id;
        const profileId = req.params.profileId;

        if (!userId) throw new BadRequestError("User not authenticated");

        const user = await findUserById(userId);
        if (!user) throw new BadRequestError("User not found");

        if (!user.profiles.includes(profileId))
            throw new NotAuthorizedError("You do not own this profile");

        await deleteProfile(profileId);

        user.profiles = user.profiles.filter(p => p.toString() !== profileId);
        await user.save();

        res.status(200).json({ message: "Profile deleted successfully" });
    } catch (err) {
        next(err);
    }
};
