import { body } from 'express-validator';
import { ROLE,TALENT,VERIFICATION,GENDER } from '../../constants/enums.constants.js';

const validateUser = [
    body('fullName')
        .isString()
        .trim()
        .withMessage('Full name is need to be a String')
        .isLength({min:3})
        .withMessage('Length of FullName should not be less than 6'),
    body('username')
        .isString()
        .withMessage('Username should be string')
        .isLength({min: 6})
        .withMessage('Length of Username should not be less than 6'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .toLowerCase()
        .withMessage('Provide a valid email'),
    body('password')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
        .withMessage('Password should be minimum of 8 characters and include an Uppercase, a lowercase, a number and a character'),
    body('role')
        .isIn(Object.values(ROLE))
        .withMessage('Role does not exist!'),
    body('talent')
        .isIn(Object.values(TALENT))
        .withMessage('Talent does not exist!'),   
    body('birthdate')
        .isDate()
        .withMessage('Birth date is required as a date!')
        .isBefore('Jan 1, 2010')
        .isAfter('Jan 1, 1900')
        .withMessage('Your age is not allowed to have this account!'),
    body('gender')
        .isString()
        .withMessage('Gender should be a String!')
        .isIn(Object.values(GENDER))
        .withMessage('Gender should be either Male or Female!'),
    body('address')
        .isObject()
        .withMessage('Address needs to be an Object'), 

];

export default validateUser;