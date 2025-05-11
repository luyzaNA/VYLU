import express from 'express';
import {loginValidation, registerValidation} from "../middlewares/user-validation.js";
import {validateRequest} from "../middlewares/request-validation.js";
import {login, register} from '../controllers/auth-controller.js';

const auth_router = express.Router();

auth_router.post('/register', registerValidation, validateRequest, register);
auth_router.post('/login', loginValidation, validateRequest, login);

export default auth_router;
