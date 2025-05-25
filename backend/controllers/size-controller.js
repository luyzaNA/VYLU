import {BadRequestError} from "../errors/bad-request.js";
import {DuplicateEntryError} from "../errors/duplicate-entry.js";
import {checkDuplicateProductSize, createProductSize, getAllProductSizes, getProductSizeById, updateProductSize} from "../services/size-service.js";
import {ForbiddenError} from "../errors/forbidden-error.js";
import {validateSizeValues} from "../utils/size-values-validate.js";

export const createSize = async (req, res, next) => {
    try {
        const user = req.currentUser;
        if (!user)
            throw new BadRequestError("User not authenticated");

        if (user.role !== 'admin')
            throw new ForbiddenError("Only admins can create sizes");

        const existing = await checkDuplicateProductSize(req.body);
        if (existing) {
            throw new DuplicateEntryError(`Size with type ${req.body.type} and label ${req.body.label} already exists.`);
        }

        const size = await createProductSize(req.body);
        res.status(201).json(size);
    } catch (err) {
        next(err);
    }
};

export const getAllSizes = async (req, res, next) => {
    try {
        const sizes = await getAllProductSizes();
        res.status(200).json(sizes);
    } catch (err) {
        next(err);
    }
};

export const getSizeById = async (req, res, next) => {
    try {
        const { sizeId } = req.params;

        const size = await getProductSizeById(sizeId);

        if (!size)
            throw new BadRequestError("Size not found");

        res.status(200).json(size);
    } catch (err) {
        next(err);
    }
}

const mapToObj = (map) => {
    const obj = {};
    for (const [key, val] of map.entries()) {
        obj[key] = val;
    }
    return obj;
};

export const updateSize = async (req, res, next) => {
    try {
        const user = req.currentUser;
        if (!user)
            throw new BadRequestError("User not authenticated");

        if (user.role !== 'admin')
            throw new ForbiddenError("Only admins can update sizes");

        const { sizeId } = req.params;
        const { type, label, values } = req.body;
        const existingSize = await getProductSizeById(sizeId);

        if (!existingSize) {
            throw new BadRequestError("Size not found");
        }

        if (type) {
            throw new BadRequestError("Type field cannot be updated." );
        }

        const updateData = {};

        if (label !== undefined)
            updateData.label = label;


        if (values !== undefined) {
            const currentValuesObj = existingSize.values instanceof Map
                ? mapToObj(existingSize.values)
                : (existingSize.values || {});

            const mergedValues = { ...currentValuesObj, ...values };
            validateSizeValues(existingSize.type, mergedValues);
            updateData.values = mergedValues;
        }

        if (label !== undefined) {
            const existing = await checkDuplicateProductSize({ type: existingSize.type, label }, sizeId);
            if (existing) {
                throw new DuplicateEntryError(`Size with label ${label} already exists.`);
            }
        }

        const updated = await updateProductSize(sizeId, updateData);
        if (!updated)
            throw new BadRequestError("Size not found");

        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

