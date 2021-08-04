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
    body('email')
        .isEmail()
        .normalizeEmail()
        .toLowerCase()
        .withMessage('Provide a valid email'),
    body('password')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
        .withMessage('Password should be minimum of 8 characters and include an Uppercase, a lowercase, a number and a character'),
    body('isActive')
        .isBoolean()
        .withMessage('isActive should be a boolean'),

];