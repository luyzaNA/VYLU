import express from 'express';
import {requireAdmin} from "../middlewares/require-admin.js";
import {requireAuth} from "../middlewares/require-auth.js";
import {currentUser} from "../middlewares/current-user.js";
import {createSize, deleteSize, getAllSizes, getSizeById, updateSize} from "../controllers/size-controller.js";
import {sizeValidator} from "../middlewares/Express-validator/size-validator.js";
import {validateRequest} from "../middlewares/request-validation.js";


const size_router = express.Router();

size_router.use(currentUser, requireAuth, requireAdmin);

size_router.get('/sizes', getAllSizes);
size_router.get('/size/:sizeId', getSizeById);
size_router.post('/size',sizeValidator,validateRequest, createSize);
size_router.put('/size/:sizeId',sizeValidator,validateRequest, updateSize);
size_router.delete('/size/:sizeId', deleteSize);

export default size_router;
