import { validationResult } from 'express-validator';
import {BadRequestError} from "../errors/bad-request.js";

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new BadRequestError(errors.array().map(err => err.msg).join(', '));
    }
    next();
};
