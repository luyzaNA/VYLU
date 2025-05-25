import express from 'express';
import {requireAdmin} from "../middlewares/require-admin.js";
import {requireAuth} from "../middlewares/require-auth.js";
import {currentUser} from "../middlewares/current-user.js";
import {createSize, getAllSizes, getSizeById, updateSize} from "../controllers/size-controller.js";
import {sizeCreatorValidator, sizeUpdateValidator} from "../middlewares/Express-validator/size-validator.js";
import {validateRequest} from "../middlewares/request-validation.js";

const size_router = express.Router();

size_router.get('/sizes', getAllSizes);
size_router.get('/size/:sizeId', getSizeById);
size_router.post('/size',currentUser, requireAuth, requireAdmin, sizeCreatorValidator,validateRequest, createSize);
size_router.put('/size/:sizeId', currentUser, requireAuth, requireAdmin, sizeUpdateValidator,validateRequest, updateSize);

export default size_router;
