import { generatePasswordHash, validatePassword } from "./hashpassword";
import bcrypt from 'bcrypt';


test('should hash a password', () => {
    const pass = '12345678';
    const generated = bcrypt.hash(pass, 10);
    expect(generatePasswordHash(pass)).toEqual(generated)
});

test('should return true if passwords match ', () => {
    const pass = '123456';
    const samePass = '123456';
    const expected = validatePassword(pass, samePass);
    const received = bcrypt.compare(pass, samePass);
    expect(expected).toEqual(received);
});

test('should return false if passwords do not match', () => {
    const pass = '123456';
    const samePass = '23456';
    const expected = validatePassword(pass, samePass);
    const received = bcrypt.compare(pass, samePass);
    expect(expected).not.toBe(received);
});

