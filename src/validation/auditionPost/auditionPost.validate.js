import { body } from 'express-validator';

const validateAuditionPost = [
    body('text')
        .isString()
        .withMessage('Text of Audition Post should be String!')
        .isLength({min: 10, max: 200})
        .withMessage('Audition Post text should range 10 - 200 characters!')
];