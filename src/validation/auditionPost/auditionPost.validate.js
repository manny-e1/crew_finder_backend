import { body } from 'express-validator';
import { GENDER, TALENT } from '../../constants/enums.constants.js';

const validateAuditionPost = [
    body('title')
        .isString()
        .withMessage('Title of Audition Post should be String!'),
    body('text')
        .isString()
        .withMessage('Text of Audition Post should be String!')
        .isLength({ min: 10, max: 1000 })
        .withMessage('Audition Post text should range 10 - 1000 characters!'),
    body('talents')
        .isArray()
        .withMessage('Talent of Audition Post should be an Array!'),
    body('talents.*')
        .isIn(Object.values(TALENT))
        .withMessage('Talent is not found!'),
    body('region')
        .isString()
        .withMessage('Region should be a string.'),
    body('gender')
        .isArray()
        .withMessage('Gender should be an array of strings.'),
    body('gender.*')
        .isIn(Object.values(GENDER))
        .withMessage('Gender is not found!'),
    body('languages')
        .isArray()
        .withMessage('Languages should be an array of strings'),
    body('endorsementCount')
        .isNumeric()
        .withMessage('Endorsement count should be a number'),
    body('ageRange')
        .isObject()
        .withMessage('age range should be an object'),
    body('ageRange.min')
        .isNumeric()
        .withMessage('minimum age should be a number'),
    body('ageRange.max')
        .isNumeric()
        .withMessage('maximum age should be a number'),

];

export default validateAuditionPost;