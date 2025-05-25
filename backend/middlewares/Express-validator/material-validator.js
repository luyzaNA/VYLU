import { body } from "express-validator";

export const materialCreatorValidator = [
    body("materialName")
        .trim()
        .notEmpty().withMessage("Material name is required")
        .isLength({ min: 3 }).withMessage("Material name must be at least 3 characters long")
        .isLength({ max: 100 }).withMessage("Material name cannot exceed 100 characters"),

    body("elasticityLevel")
        .notEmpty().withMessage("Elasticity level is required")
        .isFloat({ min: 0.0, max: 1.0 }).withMessage("Elasticity level must be between 0.0 and 1.0"),
];

export const updateMaterialValidator = [
    body("materialName")
        .optional()
        .trim()
        .notEmpty().withMessage("Material name cannot be empty")
        .isLength({ min: 3 }).withMessage("Material name must be at least 3 characters long")
        .isLength({ max: 100 }).withMessage("Material name cannot exceed 100 characters"),

    body("elasticityLevel")
        .optional()
        .isFloat({ min: 0.0, max: 1.0 }).withMessage("Elasticity level must be between 0.0 and 1.0"),
];