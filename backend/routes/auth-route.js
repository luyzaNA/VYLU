import express from 'express';
import {loginValidator, registerValidator} from "../middlewares/user-validator.js";
import {validateRequest} from "../middlewares/request-validation.js";
import {login, register} from '../controllers/auth-controller.js';

const auth_router = express.Router();

auth_router.post('/register', registerValidator, validateRequest, register);
auth_router.post('/login', loginValidator, validateRequest, login);

export default auth_router;
