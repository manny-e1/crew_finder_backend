import { generateJWT } from "./generateJWT";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';



dotenv.config();


const id = 1234;
const generated = jwt.sign({id,}, process.env.SECRET_KEY);
test('should generate JWT', () => {
    expect(generateJWT(id)).toMatch(generated);
});