import { BadRequestError } from "../../errors/bad-request.js";
import { sizeFieldsByType } from "../../utils/size-fields.js";
import {body} from "express-validator";
import {sizeFieldLimits} from "../../utils/size-fields-limits.js";

export const sizeValidator = [
    body('type')
        .isIn(Object.keys(sizeFieldsByType))
        .withMessage('Invalid product type'),

    body('label')
        .isIn(['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'])
        .withMessage('Invalid size label'),

    body('values').custom((value, { req }) => {
        const type = req.body.type;
        const expectedFields = sizeFieldsByType[type];

        if (!expectedFields) {
            throw new BadRequestError(`Invalid type: ${type}`);
        }

        if (typeof value !== 'object' || value === null) {
            throw new BadRequestError('values must be an object');
        }

        for (const field of expectedFields) {
            if (!(field in value)) {
                throw new BadRequestError(`Missing required field: ${field}`);
            }
            const fieldValue = value[field];
            const limits = sizeFieldLimits[field];
            if (!limits) continue;

            if (typeof fieldValue !== 'number') {
                throw new BadRequestError(`${field} must be a number`);
            }

            if (fieldValue < limits.min || fieldValue > limits.max) {
                throw new BadRequestError(`${field} must be between ${limits.min} and ${limits.max}`);
            }
        }

        const extraFields = Object.keys(value).filter(f => !expectedFields.includes(f));
        if (extraFields.length > 0) {
            throw new BadRequestError(`Invalid extra fields: ${extraFields.join(', ')}`);
        }

        return true;
    }),
];

