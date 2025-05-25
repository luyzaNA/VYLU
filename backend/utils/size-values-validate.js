import { BadRequestError } from "../errors/bad-request.js";
import { sizeFieldsByType } from "./size-fields.js";
import { sizeFieldLimits } from "./size-fields-limits.js";

export const validateSizeValues = (type, values) => {
    const expectedFields = sizeFieldsByType[type];

    if (!expectedFields) {
        throw new BadRequestError(`Invalid type: ${type}`);
    }

    if (typeof values !== 'object' || values === null) {
        throw new BadRequestError('values must be an object');
    }

    for (const field of expectedFields) {
        if (!(field in values)) {
            throw new BadRequestError(`Missing required field: ${field}`);
        }
        const fieldValue = values[field];
        const limits = sizeFieldLimits[field];
        if (!limits) continue;

        if (typeof fieldValue !== 'number') {
            throw new BadRequestError(`${field} must be a number`);
        }

        if (fieldValue < limits.min || fieldValue > limits.max) {
            throw new BadRequestError(`${field} must be between ${limits.min} and ${limits.max}`);
        }
    }

    const extraFields = Object.keys(values).filter(f => !expectedFields.includes(f));
    if (extraFields.length > 0) {
        throw new BadRequestError(`Invalid extra fields: ${extraFields.join(', ')}`);
    }

    return true;
};

export const validateSizeValuesOnlyExtra = (type, values) => {
    const expectedFields = sizeFieldsByType[type];
    if (!expectedFields) throw new BadRequestError(`Invalid type: ${type}`);
    if (typeof values !== 'object' || values === null) {
        throw new BadRequestError('values must be an object');
    }
    const extraFields = Object.keys(values).filter(f => !expectedFields.includes(f));
    if (extraFields.length > 0) {
        throw new BadRequestError(`Invalid extra fields: ${extraFields.join(', ')}`);
    }
    for (const [field, value] of Object.entries(values)) {
        const limits = sizeFieldLimits[field];
        if (limits && (value < limits.min || value > limits.max)) {
            throw new BadRequestError(`${field} must be between ${limits.min} and ${limits.max}`);
        }
    }
    return true;
};
