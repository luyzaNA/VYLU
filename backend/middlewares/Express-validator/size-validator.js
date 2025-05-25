import { sizeFieldsByType } from "../../utils/size-fields.js";
import {body} from "express-validator";
import {validateSizeValues} from "../../utils/size-values-validate.js";

export const sizeCreatorValidator = [
    body('type')
        .isIn(Object.keys(sizeFieldsByType))
        .withMessage('Invalid product type'),

    body('label')
        .isIn(['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'])
        .withMessage('Invalid size label'),

    body('values').custom((value, { req }) => {
        return validateSizeValues(req.body.type, value);
    }),
];

export const sizeUpdateValidator = [
    body('type').not().exists().withMessage('Type field cannot be updated'),

    body('label')
        .optional()
        .isIn(['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'])
        .withMessage('Invalid size label'),
]

