import { body } from 'express-validator';

export const registerValidator = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password')
        .isLength({ min: 8 })
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
        .withMessage('Weak password'),
    body('userName')
        .isLength({ min: 3, max: 50 })
        .withMessage('User name must be between 3 and 50 characters'),
];

export const loginValidator = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
];


export const userProfilesValidator = [
    body('profiles')
        .isArray().withMessage('Profiles must be an array')
        .custom((value) => value.every(id => typeof id === 'string')).withMessage('Each profile ID must be a string')
];
