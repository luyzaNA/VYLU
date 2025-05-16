import { body } from 'express-validator';

export const profileValidation = [
    body('name')
        .isString().withMessage('Name must be a string')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),

    body('age')
        .isInt({ min: 1, max: 120 }).withMessage('Age must be a number between 1 and 120'),

    body('bodyMeasurements').isObject().withMessage('bodyMeasurements must be an object'),

    body('bodyMeasurements.heightCm')
        .isFloat({ min: 50, max: 300 }).withMessage('heightCm must be between 50 and 300'),

    body('bodyMeasurements.chestCm')
        .isFloat({ min: 30, max: 200 }).withMessage('chestCm must be between 30 and 200'),

    body('bodyMeasurements.waistCm')
        .isFloat({ min: 30, max: 150 }).withMessage('waistCm must be between 30 and 150'),

    body('bodyMeasurements.hipsCm')
        .isFloat({ min: 40, max: 200 }).withMessage('hipsCm must be between 40 and 200'),

    body('bodyMeasurements.shoulderWidthCm')
        .isFloat({ min: 30, max: 80 }).withMessage('shoulderWidthCm must be between 30 and 80'),

    body('bodyMeasurements.armLengthCm')
        .isFloat({ min: 30, max: 100 }).withMessage('armLengthCm must be between 30 and 100'),

    body('bodyMeasurements.inseamCm')
        .isFloat({ min: 50, max: 120 }).withMessage('inseamCm must be between 50 and 120'),

    body('bodyMeasurements.thighCm')
        .isFloat({ min: 30, max: 100 }).withMessage('thighCm must be between 30 and 100'),

    body('bodyMeasurements.kneeCm')
        .isFloat({ min: 20, max: 60 }).withMessage('kneeCm must be between 20 and 60'),

    body('bodyMeasurements.calfCm')
        .isFloat({ min: 20, max: 60 }).withMessage('calfCm must be between 20 and 60'),

    body('bodyMeasurements.neckCm')
        .isFloat({ min: 25, max: 50 }).withMessage('neckCm must be between 25 and 50'),

    body('bodyMeasurements.torsoLengthCm')
        .isFloat({ min: 40, max: 100 }).withMessage('torsoLengthCm must be between 40 and 100'),
];
