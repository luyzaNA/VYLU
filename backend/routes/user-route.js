import express from 'express';
import {createUserProfile, updateUserProfile, deleteProfileFromUser, getUserProfile, getUserProfiles} from '../controllers/user-controller.js';
import {profileCreatorValidator, profileUpdateValidator} from "../middlewares/Express-validator/profile-validator.js";
import { validateRequest } from "../middlewares/request-validation.js";
import {currentUser} from "../middlewares/current-user.js";
import {requireAuth} from "../middlewares/require-auth.js";
import {upload} from "../middlewares/upload-files.js";

const user_router = express.Router();

user_router.use(currentUser, requireAuth);

user_router.get('/profiles', getUserProfiles);
user_router.get('/profile/:profileId', getUserProfile);
user_router.post('/profile', upload.single("profilePicture"),profileCreatorValidator, validateRequest, createUserProfile);
user_router.put('/profile/:profileId',upload.single("profilePicture"), profileUpdateValidator, validateRequest, updateUserProfile);
user_router.delete('/profile/:profileId', deleteProfileFromUser);

export default user_router;
