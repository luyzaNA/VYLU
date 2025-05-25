import { body } from "express-validator";

export const priceForNewProductValidator = [
    body("price").exists().withMessage("Price is required"),

    body("price.original")
        .notEmpty().withMessage("Original price is required")
        .isFloat({ min: 0 }).withMessage("Original price must be a positive number"),

    body("price.sale")
        .optional()
        .isFloat({ min: 0 }).withMessage("Sale price must be a positive number"),

    body("price.onSale")
        .optional()
        .isBoolean().withMessage("onSale must be true or false"),

    body().custom(body => {
        if (body.price?.onSale) {
            const sale = body.price?.sale;
            const original = body.price?.original;

            if (sale == null || original == null) return true;

            if (sale >= original) {
                throw new Error("Sale price must be less than original price when onSale is true");
            }
        }
        return true;
    })
];

export const priceForUpdatedProductValidator = [
    body("price")
        .optional()
        .isObject().withMessage("Price must be an object if provided"),

    body("price.original")
        .optional()
        .notEmpty().withMessage("Original price is required when price is present")
        .isFloat({ min: 0 }).withMessage("Original price must be a positive number"),

    body("price.sale")
        .optional()
        .isFloat({ min: 0 }).withMessage("Sale price must be a positive number"),

    body("price.onSale")
        .optional()
        .isBoolean().withMessage("onSale must be true or false"),

    body().custom(body => {
        if (body.price?.onSale) {
            const sale = body.price?.sale;
            const original = body.price?.original;

            if (sale == null || original == null) return true;

            if (sale >= original) {
                throw new Error("Sale price must be less than original price when onSale is true");
            }
        }
        return true;
    })
];
