import { body } from 'express-validator';

const validateUser = [
    body('fullName'),
    body('username'),
];