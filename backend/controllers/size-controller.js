import {BadRequestError} from "../errors/bad-request.js";
import {DuplicateEntryError} from "../errors/duplicate-entry.js";
import {checkDuplicateProductSize, createProductSize, deleteProductSize, getAllProductSizes, getProductSizeById, updateProductSize} from "../services/size-service.js";
import {ForbiddenError} from "../errors/forbidden-error.js";

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
        const user = req.currentUser;
        if (!user)
            throw new BadRequestError("User not authenticated");

        if (user.role !== 'admin')
            throw new ForbiddenError("Only admins can view sizes");

        const sizes = await getAllProductSizes();
        res.status(200).json(sizes);
    } catch (err) {
        next(err);
    }
};

export const getSizeById = async (req, res, next) => {
    try {
        const user = req.currentUser;
        if (!user)
            throw new BadRequestError("User not authenticated");

        if (user.role !== 'admin')
            throw new ForbiddenError("Only admins can view sizes");

        const { sizeId } = req.params;

        const size = await getProductSizeById(sizeId);

        if (!size)
            throw new BadRequestError("Size not found");

        res.status(200).json(size);
    } catch (err) {
        next(err);
    }
};

export const updateSize = async (req, res, next) => {
    try {
        const user = req.currentUser;
        if (!user)
            throw new BadRequestError("User not authenticated");

        if (user.role !== 'admin')
            throw new ForbiddenError("Only admins can update sizes");

        const { sizeId } = req.params;
        const { type, label } = req.body;

        const existing = await checkDuplicateProductSize({ type, label }, sizeId);
        if (existing) {
            throw new DuplicateEntryError(`Size with type ${type} and label ${label} already exists.`);
        }

        const updated = await updateProductSize(sizeId, req.body);
        if (!updated)
            throw new BadRequestError("Size not found");

        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

export const deleteSize = async (req, res, next) => {
    try {
        const user = req.currentUser;
        if (!user)
            throw new BadRequestError("User not authenticated");
        if (user.role !== 'admin')
            throw new ForbiddenError("Only admins can delete sizes");

        const { sizeId } = req.params;
        const deleted = await deleteProductSize(sizeId);
        if (!deleted)
            throw new BadRequestError("Size not found");

        res.status(200).json({ message: "Size deleted successfully" });
    } catch (err) {
        next(err);
    }
};
