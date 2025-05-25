import {createProfile, updateProfile, deleteProfile, getProfileById,} from '../services/profile-service.js';
import {BadRequestError} from '../errors/bad-request.js';
import {findUserById, getUserWithProfiles} from '../services/user-service.js';
import {NotAuthorizedError} from "../errors/not-authorized.js";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

export const createUserProfile = async (req, res, next) => {
    try {
        const userId = req.currentUser?.id;
        if (!userId)
            throw new BadRequestError("User not authenticated");

        const user = await findUserById(userId);
        if (!user)
            throw new BadRequestError("User not found");

        const s3 = new AWS.S3();
        let profilePictureUrl;

        if (req.file) {
            const fileKey = uuidv4();
            const params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: fileKey,
                Body: req.file.buffer,
                ACL: "public-read",
            };

            const uploadedFile = await s3.upload(params).promise();
            profilePictureUrl = uploadedFile.Location;
        }

        const profileData = {
            ...req.body,
        };

        if (profilePictureUrl) {
            profileData.profilePicture = profilePictureUrl;
        }

        const profile = await createProfile(profileData);

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

        let profilePictureUrl;

        if (req.file) {
            const s3 = new AWS.S3();
            const fileKey = uuidv4();

            const params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: fileKey,
                Body: req.file.buffer,
                ACL: "public-read"
            };

            const uploadedFile = await s3.upload(params).promise();
            profilePictureUrl = uploadedFile.Location;
        }

        const updatedData = {
            ...req.body,
        };

        if (profilePictureUrl) {
            updatedData.profilePicture = profilePictureUrl;
        }

        const updatedProfile = await updateProfile(profileId, updatedData);
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
