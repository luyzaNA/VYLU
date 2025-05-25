import {checkDuplicateProductName, createProduct, deleteProductById, findProductById, getAllProducts, getProductWithCombinedSize, updateProductById} from "../services/product-service.js";
import {BadRequestError} from "../errors/bad-request.js";
import {ForbiddenError} from "../errors/forbidden-error.js";
import {DuplicateEntryError} from "../errors/duplicate-entry.js";
import {validateSizeValuesOnlyExtra} from "../utils/size-values-validate.js";
import {getProductSizeById} from "../services/size-service.js";
import {v4 as uuiv4} from 'uuid';
import AWS from 'aws-sdk';

export const createProductController = async (req, res, next) => {
    try {
        const user = req.currentUser;
        if (!user)
            throw new BadRequestError("User not authenticated");

        if (user.role !== "admin")
            throw new ForbiddenError("Only admins can create products");

        const existingProductByName = await checkDuplicateProductName(req.body.name);
        if (existingProductByName) {
            throw new DuplicateEntryError(`Product with name ${req.body.name} already exists.`);
        }
        if (req.body.customSizeOverride && Object.keys(req.body.customSizeOverride).length > 0) {
            const sizeDoc = await getProductSizeById(req.body.size);
            if (!sizeDoc)
                throw new BadRequestError('Invalid size reference');
            validateSizeValuesOnlyExtra(sizeDoc.type, req.body.customSizeOverride);
        }

        const s3 = new AWS.S3();
        const uploadedPhotos = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const fileKey = uuiv4();

                const params = {
                    Bucket: process.env.AWS_S3_BUCKET_NAME,
                    Key: fileKey,
                    Body: file.buffer,
                    ACL: 'public-read'
                };
                const uploadedFile = await s3.upload(params).promise();
                uploadedPhotos.push(uploadedFile.Location); }
        }
        const productData = {
            ...req.body,
            photos: uploadedPhotos.length > 0 ? uploadedPhotos : req.body.photos || [],
        };

        const product = await createProduct(productData);

        res.status(201).json(product);
    } catch (err) {
        next(err);
    }
};

export const getAllProductsController = async (req, res, next) => {
    try {
        const products = await getAllProducts(req.query);
        res.status(200).json(products);
    } catch (err) {
        next(err);
    }
};

export const getProductByIdController = async (req, res, next) => {
    try {
        const product = await getProductWithCombinedSize(req.params.id);
        if (!product)
            throw new BadRequestError("Product not found");

        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
};
export const updateProductByIdController = async (req, res, next) => {
    try {
        const user = req.currentUser;
        if (!user) throw new BadRequestError("User not authenticated");
        if (user.role !== "admin")
            throw new ForbiddenError("Only admins can update products");

        const product = await findProductById(req.params.id);
        if (!product)
            throw new BadRequestError("Product not found");

        if (req.body.name) {
            const existingProductByName = await checkDuplicateProductName(req.body.name);
            if (existingProductByName && existingProductByName._id.toString() !== req.params.id) {
                throw new DuplicateEntryError(`Product with name ${req.body.name} already exists.`);
            }
        }
        if (req.body.customSizeOverride && Object.keys(req.body.customSizeOverride).length > 0) {
            const sizeDoc = await getProductSizeById(product.size);
            if (!sizeDoc)
                throw new BadRequestError('Invalid size reference');
            validateSizeValuesOnlyExtra(sizeDoc.type, req.body.customSizeOverride);
        }

        const s3 = new AWS.S3();
        const uploadedPhotos = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const fileKey = uuiv4();
                const params = {
                    Bucket: process.env.AWS_S3_BUCKET_NAME,
                    Key: fileKey,
                    Body: file.buffer,
                    ACL: 'public-read'
                };
                const uploadedFile = await s3.upload(params).promise();
                uploadedPhotos.push(uploadedFile.Location);
            }
        }

        const updatedData = {
            ...req.body,
        };

        if (uploadedPhotos.length > 0)
            updatedData.photos = [...(product.photos || []), ...uploadedPhotos];


        const updatedProduct = await updateProductById(req.params.id, updatedData);
        if (!updatedProduct)
            throw new BadRequestError("Product not found");

        res.status(200).json(updatedProduct);
    } catch (err) {
        next(err);
    }
};



export const deleteProductByIdController = async (req, res, next) => {
    try {
        const user = req.currentUser;
        if (!user)
            throw new BadRequestError("User not authenticated");

        if (user.role !== "admin")
            throw new ForbiddenError("Only admins can delete products");

        const deleted = await deleteProductById(req.params.id);
        if (!deleted)
            throw new BadRequestError("Product not found");

        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
