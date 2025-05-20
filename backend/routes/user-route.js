import express from 'express';
import {createUserProfile, updateUserProfile, deleteProfileFromUser, getUserProfile, getUserProfiles} from '../controllers/user-controller.js';
import { profileValidator } from "../middlewares/Express-validator/profile-validator.js";
import { validateRequest } from "../middlewares/request-validation.js";
import {currentUser} from "../middlewares/current-user.js";
import {requireAuth} from "../middlewares/require-auth.js";

const user_router = express.Router();

user_router.use(currentUser, requireAuth);

user_router.get('/profiles', getUserProfiles);
user_router.get('/profile/:profileId', getUserProfile);
user_router.post('/profile', profileValidator, validateRequest, createUserProfile);
user_router.put('/profile/:profileId', profileValidator, validateRequest, updateUserProfile);
user_router.delete('/profile/:profileId', deleteProfileFromUser);

export default user_router;
