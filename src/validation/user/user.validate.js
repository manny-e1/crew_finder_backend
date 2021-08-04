import { body } from 'express-validator';

const validateUser = [
    body('fullName')
        .isString()
        .trim()
        .withMessage('Full name is need to be a String'),
    body('username')
        .isString()
        .withMessage('Username should be string')
        .isLength({max: 6})
        .withMessage('Length of Username should be less than 6'),
];