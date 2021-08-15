import { body } from 'express-validator';
import { TALENT } from '../../constants/enums.constants.js';

const validateAuditionPost = [
    body('title')
        .isString()
        .withMessage('Title of Audition Post should be String!'),
    body('text')
        .isString()
        .withMessage('Text of Audition Post should be String!')
        .isLength({min: 10, max: 200})
        .withMessage('Audition Post text should range 10 - 200 characters!'),
    body('talents')
        .isArray()
        .withMessage('Talent of Audition Post should be an Array!'),
    body('talents.*')
        .isIn(Object.values(TALENT))
        .withMessage('Talent is not found!'),

];

export default validateAuditionPost;