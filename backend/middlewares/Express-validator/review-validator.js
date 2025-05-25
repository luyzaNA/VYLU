import { body } from 'express-validator';

export const reviewValidator = [
    body('rating')
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be a number between 1 and 5'),

    body('description')
        .optional()
        .isString()
        .isLength({ max: 1000 })
        .withMessage('Description cannot exceed 1000 characters'),

    body('photos')
        .optional()
        .isArray()
        .custom(arr => arr.length <= 5)
        .withMessage('Photos must have maximum 5 items'),

    body('photos.*')
        .optional()
        .isString()
        .notEmpty()
        .withMessage('Each photo must be a non-empty string'),

    body('userName')
        .isString()
        .withMessage('User name must be a string')
        .isLength({ min: 3, max: 50 })
        .withMessage('User name must be between 3 and 50 characters'),

    body('createdAt')
        .optional()
        .isISO8601()
        .withMessage('Invalid date format for createdAt'),
];
